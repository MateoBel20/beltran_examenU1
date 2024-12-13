const AWS = require("aws-sdk");
exports.updateBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { msbb_examen_u1 } = event.pathParameters;
  const { title, author, publishedyear, genre } = JSON.parse(event.body);
  await dynamodb
    .update({
      TableName: "BooksTable",
      Key: {
        msbb_examen_u1,
      },
      UpdateExpression:
        "set title = :title, author = :author, publishedyear = :publishedyear, genre = :genre",
      ExpressionAttributeValues: {
        ":title": title,
        ":author": author,
        ":publishedyear": publishedyear,
        ":genre": genre,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Libro Actualizado",
    }),
  };
};
