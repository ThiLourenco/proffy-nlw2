    // - obs: cada inserção de dados demora um tempo para ser executado por isso antes da function se usa "async" para poder usar await que significa para aguarda na linha aquele cod. até terminar, com isso podemos ter um cod que aguardará ao termino por que o normal do js é ler linha por linha sem ter essa espera de uma linha por vez; uso de crase é para ter quebra de linha


module.exports = async function(db, {proffyValue, classValue, classScheduleValues}){
    //inserir dados na table de proffys - após inserir todos os dados na variavel vai ser criado um ID do proffy
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    //inserir dados na tabela classes
    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            ); 
    `)

    const class_id = insertedClass.lastID
    
    // Inserir dados na tabela class_schedule - map atributo de array para mapaear cada elemento e retornar um array, parecido com o for each, porém esse tem retorno na db run, por que não sabemos quantas horarios o proffy irá escolher; esse valor no parâmetro da funcao os valores do test que contem os horarios e dia da semana

    //cada vez que essa funcao for executada ele está se referendo a um objeto que está nesse array
    const insertedAllClassScheduleValues = classScheduleValues.map((classSchedulevalue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classSchedulevalue.weekday}",
                "${classSchedulevalue.time_from}",
                "${classSchedulevalue.time_to}"
            );
        `)
    })            

    //arqui vou executar todos os db.runs() das class_schedules
    await Promise.all(insertedAllClassScheduleValues)
}

