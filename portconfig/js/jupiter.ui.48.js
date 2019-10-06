/** 
* @namespace 
*/
var PortLayout = {};
$(document).ready(function() {
	
	PortLayout.Global = {
		configName: "Huawei S6700",
		configPort : 48,
		pnNumber: "A-900-012-01",
		salesOrderNumber: "",
		
		showSpace : function() {
			$(".jport-config-grp").removeClass("jport-config-spacing-small");
			
			$(".jport-config-port-layout .jport-config-port").each(function(index, data) {
				if (index == 11) {
					$(this).parent().addClass("jport-config-spacing-small");
				}
				if (index == 22) {
					$(this).parent().addClass("jport-config-spacing-small");						
				}
				if (index == 35) {
					$(this).parent().addClass("jport-config-spacing-small");						
				}				
			});	
		},			
	};
});