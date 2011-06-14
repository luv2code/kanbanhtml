using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CastleHillsSoftware.HtmlKanban.Web.Models
{
    public class Sticky
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public string Id { get; set; }
        public int ZIndex { get; set; }
        public int? X { get; set; }
        public int? Y { get; set; }
        public string Width { get; set; }
        public string Height { get; set; }
        public string StickyBoardId { get; set; }
    }
}