namespace MySocialService.Helpers
{
    public class ValidationHelper
    {
        public static void CheckNullOrEmptyString(string parameter, string parameterName)
        {
            if (string.IsNullOrEmpty(parameter)) 
            { 
                throw new ArgumentException ("Value cannot be empty.", parameterName);
            }
        }
    }
}
