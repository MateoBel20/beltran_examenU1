const AWS = require("aws-sdk");

exports.getLibro = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { msbb_examen_u1 } = event.pathParameters;
    try {
    const result = await dynamodb
      .get({
        TableName: "BooksTable", 
        Key: {
          msbb_examen_u1, 
        },
      })
      .promise();

    if (!result.Item) {
      return {
        status: 404,
        body: JSON.stringify({
          message: "Libro no encontrado",
        }),
      };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Libro encontrado",
          book: result.Item
        }),
      };
      
  } catch (error) {
    console.error("Error al obtener el libro:", error);

    return {
      status: 500,
      body: JSON.stringify({
        message: "Hubo un error al obtener el libro",
        error: error.message,
      }),
    };
  }
};

/*
ESTA FUNCIÓN BUSCA TODOS LOS LIBROS EN LA TABLA BooksTable Y LOS DEVUELVE EN UNA RESPUESTA JSON.
const AWS = require("aws-sdk");
exports.getLibro = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb
    .scan({
      TableName: "BooksTable",
    })
    .promise();
  const libro = result.Items;
  return {
    statusCode: 200,
    body: JSON.stringify(libro),
  };
  
};
*/
