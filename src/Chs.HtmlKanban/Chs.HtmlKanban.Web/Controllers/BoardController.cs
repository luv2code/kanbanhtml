using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Raven.Client;
using CastleHillsSoftware.HtmlKanban.Web.Models;

namespace CastleHillsSoftware.HtmlKanban.Web.Controllers
{
	public class BoardController : RavenController
	{
		public BoardController(IDocumentStore store) : base(store) { }

		public ActionResult List()
		{
			var boards = this.ExecuteQuery<IEnumerable<StickyBoard>>(session => from board in session.Query<StickyBoard>()
					   orderby board.Title
					   select board);
			return new JsonResult() { Data = boards, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
		}

		public ActionResult Create()
		{
			StickyBoard board = new StickyBoard() { Title = "New Sticky Board" };
			ExecuteNonQuery(session =>
			{
				session.Store(board);
				session.SaveChanges();
			});
			return new JsonResult() { Data = board, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
		}
	}
}
