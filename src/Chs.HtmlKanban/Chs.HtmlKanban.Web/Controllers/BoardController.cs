using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Raven.Client;

namespace CastleHillsSoftware.HtmlKanban.Web.Controllers
{
    public class BoardController : RavenController
    {
        public BoardController(IDocumentStore store) : base(store) { }
    }
}
