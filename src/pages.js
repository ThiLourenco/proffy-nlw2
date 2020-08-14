const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')

function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageStudy(req, res) {
    const filters = req.query //recebendo os dados para filtrar
    
    //condição se não tiver o filtro subject, não tiver filtro weekday, não tiver filtro time, encaminhar o return para pagina study, se todos os campos forem preenchidos realizar o filtro
    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays })//criado para incluir de forma dinamica os proffys no html e aplicando a filtragem
    }

    //converter horas em minutos recebe em horas e conveter para minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    //filtro na database
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    ` 
    
    //caso haja erro na hora da consulta do banco de dados.

    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render('study.html', {proffys, subjects, filters, weekdays})

    } catch (error) {
        console.log(erro)
        
    }
}

function pageGiveClasses(req, res) {
    return res.render("give-classes.html", {subjects, weekdays})   
}

async function saveClasses(req, res) {
        const createProffy = require('./database/createProffy')

        const proffyValue = {
            name: req.body.name,
            avatar: req.body.avatar,
            whatsapp: req.body.whatsapp,
            bio: req.body.bio            
        }

        const classValue = {
            subject: req.body.subject,
            cost: req.body.cost
        }

        const classScheduleValues = req.body.weekday.map(
            (weekday, index) => {
            return {
                weekday,
                time_from: convertHoursToMinutes(req.body.time_from[index]),
                time_to: convertHoursToMinutes(req.body.time_to[index])
            }
        })

        try {
            //recebendo dados
            const db = await Database
            await createProffy(db, { proffyValue, classValue, classScheduleValues })
    
            //redirecionar para pagina study ja com o filtro na URL
            let queryString = "?subject=" + req.body.subject
            queryString += "&weekday=" + req.body.weekday[0]
            queryString += "&time=" + req.body.time_from[0]

            return res.redirect('/study' + queryString)

        } catch (error) {
            console.log(erro)
        }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}