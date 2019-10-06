/** 
* @namespace 
*/
var PortLayout = {};
$(document).ready(function() {
	
	PortLayout.Global = {
		configName: "D-Link 3600-32S",
		configPort : 32,
		pnNumber: "A-900-012-01",
		salesOrderNumber: "",
		
		showSpace : function() {
			$(".jport-config-grp").removeClass("jport-config-spacing-small");
			$(".jport-config-grp").removeClass("jport-config-spacing-xxlarge");
			
			$(".jport-config-port-layout .jport-config-port").each(function(index, data) {
				if (index == 7) {
					$(this).parent().addClass("jport-config-spacing-small");
				}
				if (index == 15) {
					$(this).parent().addClass("jport-config-spacing-small");
				}				
				if (index == 23) {
					$(this).parent().addClass("jport-config-spacing-xxlarge");						
				}			
			});	
		},			
	};
});