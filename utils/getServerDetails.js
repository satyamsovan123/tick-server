function getServerDetails() {
  const environment = appConfig.environment;
  const port = appConfig.port;
  const databaseName = appConfig.databaseName;
  const appName = appConfig.appName;

  const messages = [
    `Name: ${appName}`,
    `Status: Server is running on port ${port} in ${environment} environment.`,
    `Using database: ${databaseName}`,
  ];

  overengineedBoxifier(messages);
}

function overengineedBoxifier(messages) {
  let hightestLengthOfMessage = 0;
  messages.forEach((message) => {
    if (message.length > hightestLengthOfMessage) {
      hightestLengthOfMessage = message.length;
    }
  });

  console.log("- ".repeat(hightestLengthOfMessage / 2 + 3));
  messages.forEach((message) => {
    console.log(
      `- ${message} ${" ".repeat(hightestLengthOfMessage - message.length)} -`
    );
  });
  console.log("- ".repeat(hightestLengthOfMessage / 2 + 3));
}

module.exports = { getServerDetails, overengineedBoxifier };
