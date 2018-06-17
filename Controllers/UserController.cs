using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoreAngular.Models;

namespace CoreAngular.Controllers
{   
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private logindataContext _dbContext;
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        public UserController(logindataContext context)
        {
            _dbContext = context;

        }
        [HttpPost("[action]")]
        public Message[] GetMessages([FromBody]string[] data)
        {
            string user = data[0];
            IQueryable<Message> query = from message in _dbContext.Message
                        where message.To == user
                        select message;
            return query.ToArray();
           
        }
        [HttpPost("[action]")]
        public bool SendMessage([FromBody]Message msg)
        {
            _dbContext.Message.Add(msg);
            _dbContext.SaveChanges();
            return true;
        }
        [HttpPost("[action]")]
        public bool ClearMessages([FromBody]string[] data)
        {
            string user = data[0];
            var query = from message in _dbContext.Message where message.To == user select message;
            foreach(Message msg in query.ToList())
            {
                _dbContext.Message.Remove(msg);
            }
            _dbContext.SaveChanges();
            return true;
        }
        [HttpGet("[action]")]
        public IEnumerable<Login> GetUsers() {  
        
            var entries = _dbContext.Login.ToList();
          
            return _dbContext.Login.AsEnumerable().Select(index => new Login
            {
                Username = index.Username,
                Pass = index.Pass,
                UserHash = index.UserHash,
                PassHash = index.PassHash
            });
        }
        [HttpPost("[action]")]
        public JsonResult Login([FromBody]User user1)
        {
            var entries = _dbContext.Login.ToList();
            foreach(Login login in entries)
            {
                
                if(login.Username == user1.Username)
                {
                    if(Hashing.ValidatePassword(user1.Pass, login.PassHash))
                    {
                        //successful login
                        string token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
                        int i = 0;
                        foreach(Token tok in _dbContext.Token.ToList())
                        {
                            if(tok.Username == user1.Username)
                            {
                                _dbContext.Token.Remove(tok);
                                _dbContext.Token.Add(new Token { token_id = token, Username = login.Username });
                                _dbContext.SaveChanges();
                                return Json(token);
                            }
                            i++;
                        }
                        _dbContext.Token.Add(new Token { token_id = token, Username = login.Username});
                        _dbContext.SaveChanges();
                        return Json(token);
                    }
                }
            }
            return Json("");
        }
        [HttpPost("[action]")]
        public bool CreateAccount([FromBody]User user1)
        {
            var entries = _dbContext.Login.ToList();
            foreach(Login login in entries)
            {
                if(login.Username == user1.Username)
                {
                    return false;
                }
            }
            _dbContext.Login.Add(new Login { Username = user1.Username, Pass = user1.Pass, UserHash = Hashing.HashPassword(user1.Username), PassHash = Hashing.HashPassword(user1.Pass) });
            _dbContext.SaveChanges();
            return true;
        }
        [HttpPost("[action]")]
        public bool VerifyLogin([FromBody]Token tok)
        {
            var entries = _dbContext.Token.ToList();
            foreach(Token token in entries)
            {
                if(token.Username == tok.Username)
                {
                    if(token.token_id == tok.token_id)
                    {
                        return true;
                    }
                }
            }
            return false;
        }
        [HttpPost("[action]")]
        public string[] GetTodo([FromBody]string[] data)
        {
            string[] list = getFromString(_dbContext.TodoList.Find(data[0]).List);
            return list;
        }
        [HttpPost("[action]")]
        public bool SetTodo([FromBody]string[] data)
        {
            string user = data[0];
            List<string> newData = data.ToList();
            newData.RemoveAt(0);
            string list = writeToString(newData.ToArray());
            if (_dbContext.TodoList.Find(user) != null)
            {
                _dbContext.TodoList.Find(user).List = _dbContext.TodoList.Find(user).List + list;
            }
            else
            {
                _dbContext.TodoList.Add(new TodoList() { Username = user, List = list });
            }
            _dbContext.SaveChanges();
            return true;
        }
        [HttpPost("[action]")]
        public bool RemoveTodo([FromBody]string[] data)
        {
            string user = data[0];
            List<string> newData = data.ToList();
            newData.RemoveAt(0);
            string entry = newData[0];
            if (_dbContext.TodoList.Find(user) != null)
            {
                string currentData = _dbContext.TodoList.Find(user).List;
                _dbContext.TodoList.Find(user).List = currentData.Replace(entry + ";", "");
                _dbContext.SaveChanges();
            }
            else
            {
                return false;
            }
            return true;
        }

        private string writeToString(string[] arr)
        {
            string str = "";
            foreach(string s in arr)
            {
                str += s;
                str += ';';
            }
            return str;
        }
        private string[] getFromString(string str)
        {
            string[] arr = str.Split(';');
            List<string> list = arr.ToList();
            list.RemoveAt(list.Count-1);
            return list.ToArray();
        }

    }
}