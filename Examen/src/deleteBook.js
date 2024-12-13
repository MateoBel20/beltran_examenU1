const AWS = require("aws-sdk");

exports.deleteBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { msbb_examen_u1 } = event.pathParameters; 

  try {
    await dynamodb
      .delete({
        TableName: "BooksTable",  
        Key: {
          msbb_examen_u1 
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Libro Eliminado",
      }),
    };
  } catch (error) {
    console.error("Error al eliminar el libro:", error);

    return {
      status: 500,
      body: JSON.stringify({
        message: "Hubo un error al eliminar el libro",
        error: error.message,
      }),
    };
  }
};