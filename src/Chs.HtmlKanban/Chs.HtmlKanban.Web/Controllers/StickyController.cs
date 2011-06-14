using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Raven.Client;
using CastleHillsSoftware.HtmlKanban.Web.Models;

namespace CastleHillsSoftware.HtmlKanban.Web.Controllers
{
    public class StickyController : RavenController
    {
        //
        // GET: /Sticky/
        public StickyController(IDocumentStore store) : base(store) {}

        public ActionResult Create(string boardId)
        {
            var sticky = new Sticky()
            {
                Text = "just something to start with",
                Title = "Drag Me",
                Height = "auto",
                Width = "auto",
                X = 20,
                Y = 20,
                ZIndex = 0,
                StickyBoardId = boardId
            };
            ExecuteNonQuery(session => { session.Store(sticky); session.SaveChanges(); });
            return new JsonResult() { Data = sticky, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public ActionResult SaveText(string id, string text)
        {
            ExecuteNonQuery(session =>
            {
                var sticky = session.Load<Sticky>(id);
                sticky.Text = text;
                session.Store(sticky);
                session.SaveChanges();
            });
            return new EmptyResult();
        }
    }
}
