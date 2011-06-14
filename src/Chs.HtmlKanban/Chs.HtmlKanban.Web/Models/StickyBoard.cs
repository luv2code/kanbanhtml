using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CastleHillsSoftware.HtmlKanban.Web.Models
{
    public class StickyBoard
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string [] StickyNoteIds { get; set; }
    }
}