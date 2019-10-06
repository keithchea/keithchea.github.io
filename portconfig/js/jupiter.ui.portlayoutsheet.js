$(document).ready(function() {
	
	PortLayout.Model = function() {
		
		this.configName = ko.observable(PortLayout.Global.configName);		
		this.pnNumber = ko.observable(PortLayout.Global.pnNumber);
		this.salesOrderNumber = ko.observable(PortLayout.Global.salesOrderNumber);
				    		
		this.trunkPortRange = ko.observable("None");
		this.quadPortRange = ko.observable("None");
		this.dualPortRange = ko.observable("None");
		this.unlagPortRange = ko.observable("None");
		this.singlePortRange = ko.observable("Ports 1 - " + PortLayout.Global.configPort); // default

		this.chosenTrunkPort  = ko.observable(0);
		this.chosenQuadPort = ko.observable(0);
		this.chosenDualPort = ko.observable(0);
		this.chosenUnlagPort = ko.observable(0);
		this.chosenSinglePort = ko.observable(PortLayout.Global.configPort);
		
		this.trunkDropdownValues = function() {
			var values = PortLayout.View.getTrunkPortDropdownValues(PortLayout.Global.configPort);
			return values;
		};
		
		this.quadDropdownValues = function() {
			var values = PortLayout.View.getQuadPortDropdownValues(PortLayout.Global.configPort);
			return values;
		};
		
		this.dualDropdownValues = function() {
			var values = PortLayout.View.getDualPortDropdownValues(PortLayout.Global.configPort);
			return values;
		};
		
		this.unlagDropdownValues = function() {
			var values = PortLayout.View.getUnlagPortDropdownValues(PortLayout.Global.configPort);
			return values;
		};
		
		this.totalChosenPorts = function() {
			var totalChosenPorts = (this.chosenTrunkPort() + 
				  				  	this.chosenQuadPort() * 4 +
				  				  	this.chosenDualPort() * 2 + 
				  				  	this.chosenUnlagPort());
			return totalChosenPorts;
		};
		
		this.availablePorts = function() {
			var totalChosenPorts = this.totalChosenPorts();
			var availablePorts = (PortLayout.Global.configPort - totalChosenPorts);
			return availablePorts;
		};
		
		this.configLabel = function () {
			var count = this.configCount();
			var configLabel = (PortLayout.Global.configName + "-" + count);
			return configLabel;
		};
		
		this.configCount = function() {
			var configCount = (this.chosenTrunkPort() + "T-" + 
							   this.chosenQuadPort() + "Q-" +
							   this.chosenDualPort() + "D-" +
							   this.chosenUnlagPort() + "U");
			return configCount;
		};

		this.renderTrunkPorts = function() {
			var ports = this.chosenTrunkPort();
			var availablePorts = this.availablePorts();
			if (availablePorts < 0) {
				ports = 0;
			}
			return Math.floor(ports / 2);
		};
		
		this.renderQuadPorts = function() {
			var ports = this.chosenQuadPort();
			var availablePorts = this.availablePorts();
			if (availablePorts < 0) {
				ports = 0;
			}			
			return ports;
		};
		
		this.renderDualPorts = function() {
			var ports = this.chosenDualPort();
			var availablePorts = this.availablePorts();
			if (availablePorts < 0) {
				ports = 0;
			}			
			return ports;
		};
		
		this.renderSinglePorts = function() {
			var ports = this.availablePorts();
			if (ports < 0) {
				ports = 0;
			}
			return Math.floor(ports / 2);
		};
		
		this.renderUnlagPorts = function() {
			var ports = this.chosenUnlagPort();
			var availablePorts = this.availablePorts();
			if (availablePorts < 0) {
				ports = 0;
			}			
			return Math.floor(ports / 2);
		};
		
		this.chosenPort = function( port ) {
			
			var availablePorts = this.availablePorts();

			if (availablePorts < 0) {
				
				alert("Please choose the number of port again!");

				switch( port ) {
    				case 'trunk':
    					this.chosenTrunkPort(0);
    					break;
    				case 'quad':
    					this.chosenQuadPort(0);
    					break;
    				case 'dual':
    					this.chosenDualPort(0);
    					break;
    				case 'unlag':
    					this.chosenUnlagPort(0);
    					break;    					
				}
			}
			
			PortLayout.View.generatePortAndLagNumber();

			this.singlePortRange(PortLayout.View.setSinglePortRange());
			this.trunkPortRange(PortLayout.View.setTrunkPortRange());
			this.quadPortRange(PortLayout.View.setQuadPortRange());
			this.dualPortRange(PortLayout.View.setDualPortRange());
			this.unlagPortRange(PortLayout.View.setUnlagPortRange());

		};
	};

	PortLayout.View = {
		
		init : function () {
			
			var Model = new PortLayout.Model();
			ko.applyBindings(Model);

			this.generatePortAndLagNumber();
			
			$(".jport-config-input").dialog({
				title: "Configuration: ",
				modal: false,
				autoOpen: true,
				resizable: false,
				closeOnEscape: false,
				width: 180,
				position: {
					my: "left top",
					at: "left top",
					of: window
				}
			});
			
			$("#jprint").on("click", function(evt) {
				$(".jport-config-input").dialog("close");
				window.print();
			});
			
			$("#jdone").on("click", function(evt) {
				$(".jport-config-input").dialog("open");
			});
			
			$(window).on("dblclick", function(evt) {
				$(".jport-config-input").dialog("open");
			});
		},

		// BEGIN
		showPortNumber : function() {
			$(".jport-config-portnum").each(function(index, data) {
				var portNum = index + 1;
				$(this).text(portNum);
			});				
		},
		
		showLagNumber : function() {
			$(".jport-config-lag").each(function(index, data) {
				if ($(this).css("display") !== "none" ){
					var lagNum = index + 1;
					$(this).html("LAG <br>" + lagNum);
				}
			});
		},
		
		setTrunkPortRange : function () {			
			var ports = this._getSinglePortRange( "trunk" );
			var lag = $(".jport-config-trunk .jport-config-lag").text();
			var str = (ports.length > 0) ? lag + ": Ports " + ports[0] + " - " + ports[ports.length - 1] : "None";
			return str;
		},
		
		setQuadPortRange : function() {
			var range = this._getMultiPortRange( "quad" );
			var str = "",
				lag,
				port;
			for(var i in range) {
				lag = "<li>" + range[i][0] + " : Ports";
				port = " " + range[i][1][0] + " - " + range[i][1][3] + "</li>";
				str += lag + port;
			}
			return str;
		},
		
		setDualPortRange : function () {
			var range = this._getMultiPortRange( "dual" );
			var str = "",
				lag,
				port;
			for(var i in range) {
				lag = "<li>" + range[i][0] + " : Ports";
				port = " " + range[i][1][0] + " - " + range[i][1][1] + "</li>";
				str += lag + port;
			}
			return str;
		},
		
		setSinglePortRange : function () {						
			var ports = this._getSinglePortRange( "single" );
			var str = (ports.length > 0) ? "Ports " + ports[0] + " - " + ports[ports.length - 1] : "None";
			return str;
		},
		
		setUnlagPortRange : function() {
			var ports = this._getSinglePortRange( "unlag" );
			var str = (ports.length > 0) ? "Ports " + ports[0] + " - " + ports[ports.length - 1] : "None";
			return str;
		},
		
    	getTrunkPortDropdownValues : function( numPorts ) {
			var dropdownValues = this._generateDropdownValues( numPorts, true );
			return dropdownValues;
		},
		
    	getQuadPortDropdownValues : function( numPorts ) {
			var dropdownValues = this._generateDropdownValues( numPorts / 4, false );
			return dropdownValues;
		},
		
    	getDualPortDropdownValues : function( numPorts ) {
			var dropdownValues = this._generateDropdownValues( numPorts / 2, false );
			return dropdownValues;
		},
		
    	getUnlagPortDropdownValues : function( numPorts ) {
			var dropdownValues = this._generateDropdownValues( numPorts, true );
			return dropdownValues;
		},
		
    	getSinglePortDropdownValues : function( numPorts ) {
			var dropdownValues = this._generateDropdownValues( numPorts, true );
			return dropdownValues;
		},

		generatePortAndLagNumber : function (portType) {
			PortLayout.Global.showSpace();
			this.showPortNumber();
			this.showLagNumber();
		},
		
		_getMultiPortRange : function (portType) {
			var range = [];
			$(".jport-config-" + portType).each(function(index, data) {
				var ports = [];
				var i = index;
				var $parent = $(this);
				var lag = $parent.children(".jport-config-lag").text();
				range[i] = [];
				range[i].push(lag);
				$parent.find(".jport-config-portnum").each(function(index, data) {
					ports.push($(this).text());
				});
				range[i].push(ports);
			});

			return range;
		},
		
		_getSinglePortRange : function (portType) {				
			var range = [];
			$(".jport-config-" + portType + " .jport-config-portnum").each(function(index, data) {
				//TODO: push data into object for later retrieval
				range.push($(data).text());
			});	
			return range;
		},
		
		_generateDropdownValues : function( numPorts, isEven ) {
			var length = Math.floor(numPorts);
			var ports = [];
			for(var i = 0; i <= length; i++) {
				if (isEven) {
    				if (i % 2 == 0) {
    					ports.push(i);
    				}
				}
				else {
					ports.push(i);
				}
			}
			return ports;
		},
		
		_generatePortNumbers : function (start, end) {
			var ports = [];
			for(var i = start; i <= end; i++) {
				ports.push(i);
			}
			return ports;
		}
	};
	
	PortLayout.View.init();
    
});