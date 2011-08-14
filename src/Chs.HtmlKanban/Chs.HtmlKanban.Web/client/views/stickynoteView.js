/// <reference path="../../Scripts/require.js" />
/// <reference path="../../Scripts/jquery-1.6.1-vsdoc.js" />
/// <reference path="../../Scripts/jquery-ui-1.8.13.custom.min.js" />

define(['services/messenger', 'viewmodels/stickynoteViewModel', 'text!views/stickynoteView.tmpl.htm', 'lib/jquery.ui.draggable'], function (messenger) {
	var stickynote = function (view, viewmodel) {
		var $this = this;
		$this.viewModel = viewmodel;
		$this.view = view;

		$this.view.draggable({
			stop: function (event, ui) {
				$this.viewModel.updatePosition($($this.view).position());
			}
		});
		$this.view.click(function () {
			messenger.publish('bring-to-front', $this);
		});
	}

//	stickynote.prototype = {
//		refresh: function () {
//			//            $('.viewmodel', this.view)
//			//                .link(this.viewModel, this.viewModel.linkOptions)
//			//                .trigger('change');
//			this.view.css('top', this.viewModel.Y);
//			this.view.css('left', this.viewModel.X);
//			this.view.css('z-index', this.viewModel.ZIndex);
//			this.view.css('width', this.viewModel.Width);
//			this.view.css('height', this.viewModel.Height);
//		}
//	};

	return stickynote;
});