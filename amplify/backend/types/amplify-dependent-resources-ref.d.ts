export type AmplifyDependentResourcesAttributes = {
  api: {
    ff6wcstats: {
      GraphQLAPIKeyOutput: "string";
      GraphQLAPIIdOutput: "string";
      GraphQLAPIEndpointOutput: "string";
    };
  };
  function: {
    submitRun: {
      Name: "string";
      Arn: "string";
      Region: "string";
      LambdaExecutionRole: "string";
    };
  };
};
