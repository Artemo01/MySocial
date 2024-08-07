namespace MySocialService.Helpers
{
    public class ValidationHelper
    {
        public static void CheckNullOrEmptyString(string value, string variableName)
        {
            if (string.IsNullOrEmpty(value)) 
            { 
                throw new ArgumentNullException($"Value of {variableName} can not be null or empty");
            }
        }
    }
}
