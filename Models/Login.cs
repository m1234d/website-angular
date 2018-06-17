using System;
using System.Collections.Generic;

namespace CoreAngular.Models
{
    public partial class Login
    {
        public string Username { get; set; }
        public string Pass { get; set; }
        public string UserHash { get; set; }
        public string PassHash { get; set; }
    }
}
