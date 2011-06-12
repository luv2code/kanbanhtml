using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Raven.Client;


namespace CastleHillsSoftware.HtmlKanban.Web
{
    public class RavenController : Controller
    {
        protected IDocumentStore _docStore;
        public RavenController(IDocumentStore docstore)
        {
            _docStore = docstore;
        }

        public T ExecuteQuery<T>(Func<IDocumentSession, T> query)
        {
            T result;
            using (var session = _docStore.OpenSession())
            {
                result = query(session);
            }
            return result;
        }

        public void ExecuteNonQuery(Action<IDocumentSession> action)
        {
            using (var session = _docStore.OpenSession())
            {
                action(session);
            }
        }
    }
}