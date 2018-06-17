using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BCrypt.Net;

namespace CoreAngular.Models
{
    public class Hashing
    {
        private static string GetRandomSalt()
        {

            return BCrypt.Net.BCrypt.GenerateSalt(12);
        }

        public static string HashPassword(string password)
        {
            string salt = GetRandomSalt();
            return BCrypt.Net.BCrypt.HashPassword(password, salt);
        }

        public static bool ValidatePassword(string password, string correctHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, correctHash);
        }
    }
}
