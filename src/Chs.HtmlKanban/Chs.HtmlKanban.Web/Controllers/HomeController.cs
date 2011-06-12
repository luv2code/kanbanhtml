using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Raven.Client;
using CastleHillsSoftware.HtmlKanban.Web.Models;

namespace CastleHillsSoftware.HtmlKanban.Web.Controllers
{
    public class HomeController : RavenController
    {

        public HomeController(IDocumentStore store) : base(store) { }

        public ActionResult Index()
        {
            Message msg = ExecuteQuery<Message>(session => (from m in session.Query<Message>() select m).FirstOrDefault());
            if (msg == null)
            {
                msg = new Message() { Text = "RavenDb Contacted" };
                ExecuteNonQuery(session => { session.Store(msg); session.SaveChanges(); });
            }
            ViewBag.Message = msg.Text;

            return View();
        }

        public ActionResult About()
        {
            return View();
        }
    }
}
