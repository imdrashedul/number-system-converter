jQuery(document).ready(function($) {

	$('body').on("submit", "#xc", function(e){
		$("#report").html('');
		var _, _r, __r, ___r; 
		_ = $("#x-t").val();
		_r = $("#x-n").val();
			
		try{
			if(_ == 'D-B' || _ == 'D-O' || _ == 'D-H'){
				__r = raDecCon(_r, _);
			}
			else if(_ == 'B-D' || _ == 'O-D' || _ == 'H-D'){
				__r = raDecRev(_r, _);
			}
			else if(_ == 'B-O' || _ == 'B-H'){
				__r = raBinTo(_r , _);
			}
			else if(_ == 'O-B' || _ == 'H-B'){
				__r = raBinRev(_r , _);
			}
			else if(_ == 'O-H') {
				__r = raOctHex(_r, _);
			}
			else if(_ == 'H-O') {
				__r = raHexOct(_r, _);
			}
			else __r = 'Unknown Conversion. Please Choose Valid One!!';
			$("#report").html(__r);
		}
		catch(___r){
			$("#report").html(___r);
		}	
	});

	//Conversion
	function raDecCon(_n , _){
		var base;
		if(_ == 'D-B') base = 2;
		else if(_ == 'D-O') base = 8;
		else if(_ == 'D-H') base = 16;
		//
		if (!isNaN(_n) && _n.toString().indexOf('.') != -1){
			var a, b, c, d, e, f, g, h, i, j, k, m;
			k = _n.split('.');
			h = k[0];
			if(h === '' || h === null || h === undefined) h = 0;
			f = h;
			j = k[1];
			var x = [];
			var y = [];
			for(i=0; f>=base; i++){
				a = Math.floor(f/base);
				b = f % base;
				f = a;
				if(base==16) x[i] = _raHexdecode(b); else x[i] = b;
				y[i] = '<tr><td></td><td style="border-style: solid; border-width: 0px 0px 1px 1px; border-color:black;">'+ a + '</td><td style="text-align: center; border-style: solid; border-width: 0px 0px 0px 0px; border-color:black;">'+ b + (base==16 && b>9?' ('+ x[i] +')':'') +'</td></tr>';
			}
			c = x.reverse();
			c = c.join('');
			d = y.join('');
			m = parseInt(f).toString(base).toUpperCase();
			//return e;
			var a_dec, p, q, sigu, q_x, q_y, plmn, fix_n, inf;
			var frac = [];
			var frac_dec = [];
			var _a = _n.split(".");
			var __a = _a[0];
			var ___a = _a[1];
			var x5_a = parseFloat('.'+ j);
			for(l=0; l<=25 && x5_a!=0; l++){
				p = parseFloat(x5_a * base);
				q = p.toString();
				q = q.split('.');  	
				q_x = q[0];			
				q_y = q[1];			
				if(base==16) frac[l] = _raHexdecode(parseInt(q_x)); else frac[l] = q_x;
				x5_a = p-q_x;
				if(l!=8 && x5_a!=0){
					plmn = '<br> &#215; '+ base;
					inf = '';
				}
				else{
					plmn = '';
					inf = 'border-bottom:0;';
				}
				fix_n = x5_a.toFixed(2);
				fix_n = fix_n.toString();
				fix_n = fix_n.split('.');  				
				fix_n = fix_n[1]; 
				var b_dec;
				if(base==16){
					b_dec = _raHexdecode(parseInt(q_x));
					if(b_dec != parseInt(q_x)){
						b_dec = '(' + b_dec + ')';
					}
					else b_dec = '';
				}
				else b_dec = '';
				frac_dec[l] = '<tr><td style="border-style: solid; border-width: 0px 1px 1px 0px; border-color:black; text-align:right; vertical-align:top; '+ inf +'">' + b_dec + ' ' + q_x + '</td><td style="border-style: solid; border-width: 0px 0px 1px 0px; border-color:black; text-align:left; vertical-align: top; '+ inf +'"> .' + fix_n + plmn +'</td></tr>';
			}
			
			a_dec = frac.join('');
			var frac_x = frac_dec.join('');
			return e = '<span style="font-size:18pt">Hence, '+ _n +'<sub>10</sub> = '+ m + c +'.' + a_dec +'<sub>'+ base +'</sub></span><br><table style="border-collapse: collapse; margin:0;"><tr><td style="vertical-align:top; border-right: 1px solid black;"><table style="font-size: 14pt; border-collapse: collapse; margin:0px 5px 0px 0px;" cellpadding="5"><tr><td>'+ base +'</td><td style="border-style: solid; border-width: 0px 0px 1px 1px; border-color:black;">' + h + '</td><td style="text-align: center; border-style: solid; border-width: 0px 0px 0px 0px; border-color:black;">Remainders</td></tr>' + d + '<tr><td></td><td style="border-style: solid; border-width: 0px 0px 0px 1px; border-color:black;">0</td><td style="text-align: center; border-style: solid; border-width: 0px 0px 0px 0px; border-color:black;">'+ f +(base==16&&f>9?' ('+m+')':'')+'</td></tr></table></td><td style="vertical-align:top;"><table style="font-size: 14pt; border-collapse: collapse; margin:0px 0px 0px 5px;" cellpadding="5"><tr><td style="border-style: solid; border-width: 0px 1px 0px 0px; border-color:black;">Integer</td><td>Fraction</td></tr><tr><td style="border-style: solid; border-width: 0px 1px 1px 0px; border-color:black; text-align:right; vertical-align:top;"></td><td style="border-style: solid; border-width: 0px 0px 1px 0px; border-color:black; text-align:left; vertical-align: top;"> .' + ___a + '<br> &#215; '+ base +'</td></tr>'+ frac_x +'</table>';
		}
		else if($.isNumeric(_n)){
			var a, b, c, d, e, f, g;
			f = _n;
			var x = [];
			var y = [];
			for(i=0; f>=base ;i++){
				a = Math.floor(f/base);
				b = f % base;
				f = a;
				if(base==16) x[i] = _raHexdecode(b); else x[i] = b;
				y[i] = '<tr><td></td><td style="border-style: solid; border-width: 0px 0px 1px 1px; border-color:black;">'+ a + '</td><td style="text-align: center; border-style: solid; border-width: 0px 0px 0px 0px; border-color:black;">'+ b + (base==16 && b>9?' ('+ x[i] +')':'')+'</td></tr>';
			}
			c = x.reverse();
			c = c.join('');
			d = y.join('');
			g = parseInt(f).toString(base).toUpperCase();
			e = '<span style="font-size:18pt">Hence, '+ _n +'<sub>10</sub> = '+ g + c +'<sub>'+ base +'</sub></span><br><table style="font-size: 14pt; border-collapse: collapse; margin:0;" cellpadding="5"><tr><td>'+ base +'</td><td style="border-style: solid; border-width: 0px 0px 1px 1px; border-color:black;">' + _n + '</td><td>Remainders</td></tr>' + d + '<tr><td></td><td style="border-style: solid; border-width: 0px 0px 0px 1px; border-color:black;">0</td><td style="text-align: center; border-style: solid; border-width: 0px 0px 0px 0px; border-color:black;">'+ f +(base==16&&f>9?' ('+g+')':'')+'</td></tr></table>';
			return e;
		}
		else return 'Please Input a Valid Decimal Number';
	}
	function raDecRev(_n , _){
		var base, hexpoint, octpoint, binpoint;
		hexpoint = false;
		octpoint = false;
		binpoint = false;
		if(_ == 'B-D') base = 2;
		else if(_ == 'O-D') base = 8;
		else if(_ == 'H-D') base = 16;
		if(_n.toString().indexOf('.') != -1 && base == 16){
			var h0 = _n.split(".");
			var h1 = h0[0];
			var h2 = h0[1];
			if(raH(h1) && raH(h2)) hexpoint = true;
		}
		if(_n.toString().indexOf('.') != -1 && base == 8){
			var o0 = _n.split(".");
			var o1 = o0[0];
			var o2 = o0[1];
			if(raO(o1) && raO(o2)) octpoint = true;
		}
		if(_n.toString().indexOf('.') != -1 && base == 2){
			var b0 = _n.split(".");
			var b1 = b0[0];
			var b2 = b0[1];
			if(raB(b1) && raB(b2)) binpoint = true;
		}

		if (octpoint || hexpoint || binpoint){
			var synNum = [], synDec1 = [], synDec2 = [], synDec3 = [], synpNum = [], synpDec1 = [], synpDec2 = [], synpDec3 = [], digitspX, npwx, pcalv, digitsX, pwx, calv, rval;
			var numSeq = _n.toString();
				numSeq = numSeq.split(".");
			var numSeq1 = numSeq[0];
			var numSeq2 = numSeq[1];
			
			for(var nX=0, nxLen = numSeq1.length; nX < nxLen; nX++){
				pwx = nxLen - nX - 1;
				digitsX = numSeq1.charAt(nX);
				if(base==16) {digitsX = parseInt(digitsX, 16); }
				calv = Math.pow(base,pwx)*digitsX;
				synNum.push(calv);
				var decLine1, decLine2, decLine3;
				decLine1 = '('+ numSeq1.charAt(nX).toString().toUpperCase() +' &#215; '+ base +'<sup>'+ pwx +'</sup>)';
				decLine2 = digitsX + ' &#215; ' + Math.pow(base,pwx);
				decLine3 = calv;
				synDec1.push(decLine1);
				synDec2.push(decLine2);
				synDec3.push(decLine3);	
			}
			for(var pnX=0, pnxLen = numSeq2.length; pnX < pnxLen; pnX++){
				npwx = pnX + 1;
				digitspX = numSeq2.charAt(pnX);
				if(base==16) {digitspX = parseInt(digitspX, 16); }
				pcalv = (1/(Math.pow(base,npwx)))*digitspX;
				synpNum.push(pcalv);
				var decpLine1, decpLine2, decpLine3;
				decpLine1 = '('+ numSeq2.charAt(pnX).toString().toUpperCase() +' &#215; '+ base +'<sup>-'+ npwx +'</sup>)';
				decpLine2 = digitspX + ' &#215; 1/' + Math.pow(base,npwx);
				decpLine3 = pcalv;
				synpDec1.push(decpLine1);
				synpDec2.push(decpLine2);
				synpDec3.push(decpLine3);
				
			}
			for(var bmx=0, bmxSum=0; bmx < synNum.length; bmxSum += synNum[bmx++]);
			for(var pbmx=0, pbmxSum=0; pbmx < synpNum.length; pbmxSum += synpNum[pbmx++]);
			var revalTo = bmxSum+pbmxSum;
			rval = '<span style="font-size:18pt">Hence, '+numSeq1+'.'+numSeq2+'<sub>'+base+'</sub> = '+ revalTo +'<sub>10</sub></span><br><table style="font-size: 14pt;"><tr><td valign="top">'+numSeq1+'.'+numSeq2+'<sub>'+base+'</sub></td><td> = '+synDec1.join(' + ')+' + '+synpDec1.join(' + ')+'</td></tr><tr><td></td><td>= '+synDec2.join(' + ')+' + '+synpDec2.join(' + ')+'</td></tr><tr><td></td><td>= '+synDec3.join(' + ')+' + '+synpDec3.join(' + ')+'</td></tr><tr><td></td><td> = '+revalTo+'<sub>10</sub></td></tr></table>';
			return rval;
		}
		else if((raH(_n) && base==16) || (raB(_n) && base==2) || (raO(_n) && base==8)){
			var synNum = [], synDec1 = [], synDec2 = [], synDec3 = [], digitsX, pwx, calv, rval;
			var numSeq = _n.toString();
			for(var nX=0, nxLen = numSeq.length; nX < nxLen; nX++){
				pwx = nxLen - nX - 1;
				digitsX = numSeq.charAt(nX);
				if(base==16) {digitsX = parseInt(digitsX, 16); }
				calv = Math.pow(base,pwx)*digitsX;
				synNum.push(calv);
				var decLine1, decLine2, decLine3;
				decLine1 = '('+ numSeq.charAt(nX).toString().toUpperCase() +' &#215; '+ base +'<sup>'+ pwx +'</sup>)';
				decLine2 = digitsX + ' &#215; ' + Math.pow(base,pwx);
				decLine3 = calv;
				synDec1.push(decLine1);
				synDec2.push(decLine2);
				synDec3.push(decLine3);	
			}
			for(bmx=0, bmxSum=0; bmx < synNum.length; bmxSum += synNum[bmx++]);
			rval = '<span style="font-size:18pt">Hence, '+ numSeq +'<sub>'+base+'</sub> = '+ bmxSum +'<sub>10</sub></span><br><table style="font-size: 14pt;"><tr><td>'+numSeq+'<sub>'+base+'</sub></td><td> = '+synDec1.join(' + ')+'</td></tr><tr><td></td><td>= '+synDec2.join(' + ')+'</td></tr><tr><td></td><td>= '+synDec3.join(' + ')+'</td></tr><tr><td></td><td> = '+bmxSum+'<sub>10</sub></td></tr></table>';
			return rval;
		}
		else return 'Please Insert a Valid B-O-H Number';
	}
	function raBinTo(_n , _){
		var base, binpoint, nmod, numay, bjoin, plette = [], synBin = [], synBinDec, pbjoin, pplette = [], psynBin = [], psynBinDec;
		binpoint = false;
		var dvx = '<div style="display: inline-block; width:20px; height:2px;"></div>';
		if(_ == 'B-O'){
			base = 8;
			nmod = 3;
		}
		else if(_ == 'B-H'){
			base = 16;
			nmod = 4;
		}
		if(_n.toString().indexOf('.') != -1){
			var b0 = _n.split(".");
			var b1 = b0[0];
			var b2 = b0[1];
			if(raB(b1) && raB(b2)) binpoint = true;
		}
		if(binpoint){
			var blen, bneed, bmod, pblen, pbmod, pbneed;
			blen = b1.toString().length;
			pblen = b2.toString().length;
			bmod = blen%nmod;
			pbmod = pblen%nmod;
			if(bmod!=0){
					bneed = blen+nmod-bmod;
					b1 = raAddr(b1, bneed);
			}
			if(pbmod!=0){
					pbneed = pblen+nmod-pbmod;
					b2 = b2.toString().split('').reverse().join('');
					b2 = raAddr(b2, pbneed);
					b2 = b2.toString().split('').reverse().join('');
			}
			numay = b1.toString().match(new RegExp('.{1,'+nmod+'}','g'));
			var pnumay = b2.toString().match(new RegExp('.{1,'+nmod+'}','g'));
			for(var eps = 0; eps<numay.length; eps++){
				var binLine1;
				var digy = numay[eps];
				var dexp = parseInt(digy, 2).toString(base).toUpperCase();
				binLine1 = '<div style="display: inline-block"><div style="border-bottom: 1px solid black;">'+ digy +'</div><div style="text-align: center; padding-top:8px;">'+ dexp +'</div></div>';
				synBin.push(dexp);
				plette.push(binLine1);
			}
			for(var epks = 0; epks<pnumay.length; epks++){
				var pbinLine1;
				var pdigy = pnumay[epks];
				var pdexp = parseInt(pdigy, 2).toString(base).toUpperCase();
				pbinLine1 = '<div style="display: inline-block"><div style="border-bottom: 1px solid black;">'+ pdigy +'</div><div style="text-align: center; padding-top:8px;">'+ pdexp +'</div></div>';
				psynBin.push(pdexp);
				pplette.push(pbinLine1);
			}
			
			synBinDec = synBin.join('');
			psynBinDec = psynBin.join('');
			bjoin = plette.join(dvx);
			pbjoin = pplette.join(dvx);
			return '<span style="font-size:18pt">Hence, '+ _n +'<sub>2</sub> = '+ synBinDec +'.'+ psynBinDec +'<sub>'+ base +'</sub></span><br><table style="font-size: 14pt;"><tr><td valign="top">'+ _n +'<sub>2</sub></td><td><span style="vertical-align:top">=</span> '+ bjoin + dvx +'<span style="vertical-align:top">.</span>'+ dvx + pbjoin +'</td></tr><tr><td></td><td>= '+ synBinDec + '.' + psynBinDec +'<sub>'+ base +'</sub></td></tr></table>';
		}
		else if(raB(_n)){
			var blen, bneed, bmod;
			blen = _n.toString().length;
			bmod = blen%nmod;
			if(bmod!=0){
					bneed = blen+nmod-bmod;
					_n = raAddr(_n, bneed);
			}
			numay = _n.toString().match(new RegExp('.{1,'+nmod+'}','g'));
			for(var eps = 0; eps<numay.length; eps++){
				var binLine1;
				var digy = numay[eps];
				var dexp = parseInt(digy, 2).toString(base).toUpperCase();
				binLine1 = '<div style="display: inline-block"><div style="border-bottom: 1px solid black;">'+ digy +'</div><div style="text-align: center; padding-top:8px;">'+ dexp +'</div></div>';
				synBin.push(dexp);
				plette.push(binLine1);
			}
			synBinDec = synBin.join('');
			bjoin = plette.join(dvx);
			return '<span style="font-size:18pt">Hence, ' + _n +'<sub>2</sub> = '+ synBinDec +'<sub>'+ base +'</sub></span><br><table style="font-size: 14pt;"><tr><td valign="top">'+ _n +'<sub>2</sub></td><td><span style="vertical-align:top">=</span> '+ bjoin +'</td></tr><tr><td></td><td>= '+ synBinDec +'<sub>'+ base +'</sub></td></tr></table>';
		}
		else return 'Please Insert a Valid Binary Number';
	}
	function raBinRev(_n , _){
		var base, hexpoint, octpoint, numSeq, digitsX, nmod, blen, bneed, bmod, bnumx, binLine1, xRes, xResDec, binDec = [], ntx = [], pnumSeq, pdigitsX, pblen, pbneed, pbmod, pbnumx, pbinLine1, pxRes, pxResDec, pbinDec = [], pntx = [];
		var dvx = '<div style="display: inline-block; width:20px; height:2px;"></div>';
		hexpoint = false;
		octpoint = false;
		if(_ == 'O-B'){
			base = 8;
			nmod = 3;
		}
		else if(_ == 'H-B'){
			base = 16;
			nmod = 4;
		}
		if(_n.toString().indexOf('.') != -1 && base == 16){
			var h0 = _n.split(".");
			var h1 = h0[0];
			var h2 = h0[1];
			if(raH(h1) && raH(h2)) hexpoint = true;
		}
		if(_n.toString().indexOf('.') != -1 && base == 8){
			var o0 = _n.split(".");
			var o1 = o0[0];
			var o2 = o0[1];
			if(raO(o1) && raO(o2)) octpoint = true;
		}
		if(hexpoint || octpoint){
			if(base == 16) numSeq = h1.toString(); else if(base == 8) numSeq = o1.toString(); else numSeq = _n.toString();
			if(base == 16) pnumSeq = h2.toString(); else if(base == 8) pnumSeq = o2.toString(); else pnumSeq = _n.toString();
			for(var nX=0, nxLen = numSeq.length; nX < nxLen; nX++){
				digitsX = numSeq.charAt(nX);
				bnumx = parseInt(digitsX, base).toString(2).toUpperCase();
				blen = bnumx.length;
				bmod = blen%nmod;
				if(bmod!=0){
					bneed = blen+nmod-bmod;
					bnumx = raAddr(bnumx, bneed);
				}
				binLine1 = '<div style="display: inline-block"><div style="text-align: center; border-bottom: 1px solid black;">'+ digitsX.toUpperCase() +'</div><div style="text-align: center; padding-top:8px;">'+ bnumx +'</div></div>';
				ntx.push(binLine1);
				binDec.push(bnumx);
			}
			for(var pnX=0, pnxLen = pnumSeq.length; pnX < pnxLen; pnX++) {
				pdigitsX = pnumSeq.charAt(pnX);
				pbnumx = parseInt(pdigitsX, base).toString(2).toUpperCase();
				pblen = pbnumx.length;
				pbmod = pblen%nmod;
				if(pbmod!=0){
					pbneed = pblen+nmod-pbmod;
					pbnumx = raAddr(pbnumx, pbneed);
				}
				pbinLine1 = '<div style="display: inline-block"><div style="text-align: center; border-bottom: 1px solid black;">'+ pdigitsX.toUpperCase() +'</div><div style="text-align: center; padding-top:8px;">'+ pbnumx +'</div></div>';
				pntx.push(pbinLine1);
				pbinDec.push(pbnumx);
			}
			xRes = raRemZ(binDec.join(''));
			xResDec = ntx.join(dvx);
			pxRes = raRemZ(pbinDec.join(''), true);
			pxResDec = pntx.join(dvx);
			return '<span style="font-size:18pt">Hence, ' + _n.toUpperCase() +'<sub>'+ base +'</sub> = '+ xRes + '.'+ pxRes +'<sub>2</sub></span><br><table style="font-size: 14pt;"><tr><td valign="top">'+ _n.toUpperCase() +'<sub>'+ base +'</sub></td><td><span style="vertical-align:top">=</span> '+ xResDec + dvx +'<span style="vertical-align:top">.</span>'+ dvx + pxResDec +'</td></tr><tr><td></td><td>= '+ xRes + '.' + pxRes +'<sub>2</sub></td></tr></table>';
		}
		else if((raO(_n) && base == 8)||(raH(_n) && base == 16)){
			numSeq = _n.toString();
			for(var nX=0, nxLen = numSeq.length; nX < nxLen; nX++){
				digitsX = numSeq.charAt(nX);
				bnumx = parseInt(digitsX, base).toString(2).toUpperCase();
				blen = bnumx.length;
				bmod = blen%nmod;
				if(bmod!=0){
					bneed = blen+nmod-bmod;
					bnumx = raAddr(bnumx, bneed);
				}
				binLine1 = '<div style="display: inline-block"><div style="text-align: center; border-bottom: 1px solid black;">'+ digitsX.toUpperCase() +'</div><div style="text-align: center; padding-top:8px;">'+ bnumx +'</div></div>';
				ntx.push(binLine1);
				binDec.push(bnumx);
			}
			xRes = raRemZ(binDec.join(''));
			xResDec = ntx.join(dvx);
			return '<span style="font-size:18pt">Hence, ' + _n.toUpperCase() +'<sub>'+ base +'</sub> = '+ xRes +'<sub>2</sub></span><br><table style="font-size: 14pt;"><tr><td valign="top">'+ _n.toUpperCase() +'<sub>'+ base +'</sub></td><td><span style="vertical-align:top">=</span> '+ xResDec +'</td></tr><tr><td></td><td>= '+ xRes +'<sub>2</sub></td></tr></table>';
		}
		else return base==16 ? 'Please Insert a Valid Hexa-Decimal Number' : 'Please Insert a Valid Octal Number';
	}
	function raOctHex(_n, _){
		var base, tbase, point, numSeq, digitsX, nmod, tmod, blen, bneed, bmod, bnumx, hnumx, hpnumx, hexLine1, hexpLine1, binLine1, hRes, hResDec, xRes, xResDec, binDec = [], ntx = [], hntx = [], hpntx = [], hexDec = [], hexpDec = [], hpRes, hpResDec, pnumSeq, pdigitsX, pblen, pbneed, pbmod, pbnumx, pbinLine1, pxRes, pxResDec, pbinDec = [], pntx = [], xCnk, xCnkf, xpCnk, xpCnkf;
		var dvx = '<div style="display: inline-block; width:20px; height:2px;"></div>';
		point = false;
		base = 8;
		nmod = 3;
		tmod = 4;
		tbase = 16;

		if(_n.toString().indexOf('.') != -1){
			var o0 = _n.split(".");
			var o1 = o0[0];
			var o2 = o0[1];
			if(raO(o1) && raO(o2)) point = true;
		}

		if(point) {
			numSeq = o1.toString();
			for(var nX=0, nxLen = numSeq.length; nX < nxLen; nX++){
				digitsX = numSeq.charAt(nX);
				bnumx = parseInt(digitsX, base).toString(2).toUpperCase();
				blen = bnumx.length;
				bmod = blen%nmod;
				if(bmod!=0){
					bneed = blen+nmod-bmod;
					bnumx = raAddr(bnumx, bneed);
				}
				binLine1 = '<div style="display: inline-block"><div style="text-align: center; border-bottom: 1px solid black;">'+ digitsX.toUpperCase() +'</div><div style="text-align: center; padding-top:8px;">'+ bnumx +'</div></div>';
				ntx.push(binLine1);
				binDec.push(bnumx);
			}
			xRes = raRemZ(binDec.join(''));
			xResDec = ntx.join(dvx);
			xCnk = raCnkRev(xRes, tmod);
			xCnkf = raCnkf(xCnk, tmod);
			for(var cnX=0, cnxLen = xCnkf.length; cnX < cnxLen; cnX++) {
				hnumx = parseInt(xCnkf[cnX], 2).toString(tbase).toUpperCase();
				hexLine1 = '<div style="display: inline-block"><div style="text-align: center; border-bottom: 1px solid black;">'+ xCnkf[cnX] +'</div><div style="text-align: center; padding-top:8px;">'+ hnumx +'</div></div>';
				hntx.push(hexLine1);
				hexDec.push(hnumx);
			}
			hRes = hexDec.join('');
			hResDec = hntx.join(dvx);
			pnumSeq = o2.toString();
			for(var pnX=0, pnxLen = pnumSeq.length; pnX < pnxLen; pnX++) {
				pdigitsX = pnumSeq.charAt(pnX);
				pbnumx = parseInt(pdigitsX, base).toString(2).toUpperCase();
				pblen = pbnumx.length;
				pbmod = pblen%nmod;
				if(pbmod!=0){
					pbneed = pblen+nmod-pbmod;
					pbnumx = raAddr(pbnumx, pbneed);
				}
				pbinLine1 = '<div style="display: inline-block"><div style="text-align: center; border-bottom: 1px solid black;">'+ pdigitsX.toUpperCase() +'</div><div style="text-align: center; padding-top:8px;">'+ pbnumx +'</div></div>';
				pntx.push(pbinLine1);
				pbinDec.push(pbnumx);
			}
			pxRes = raRemZ(pbinDec.join(''), true);
			pxResDec = pntx.join(dvx);
			xpCnk = raCnk(pxRes, tmod);
			xpCnkf = raCnkf(xpCnk, tmod, false);
			for(var pnX=0, pnxLen = xpCnkf.length; pnX < pnxLen; pnX++) {
				hpnumx = parseInt(xpCnkf[pnX], 2).toString(tbase).toUpperCase();
				hexpLine1 = '<div style="display: inline-block"><div style="text-align: center; border-bottom: 1px solid black;">'+ xpCnkf[pnX] +'</div><div style="text-align: center; padding-top:8px;">'+ hpnumx +'</div></div>';
				hpntx.push(hexpLine1);
				hexpDec.push(hpnumx);
			}
			hpRes = hexpDec.join('');
			hpResDec = hpntx.join(dvx);
			return '<span style="font-size:18pt">Hence, ' + _n.toUpperCase() +'<sub>'+ base +'</sub> = '+hRes+'.'+hpRes 
			+'<sub>'+tbase+'</sub></span><br><table style="font-size: 14pt;"><tr><td valign="top">'+ _n.toUpperCase() +'<sub>'+ base 
			+'</sub></td><td><span style="vertical-align:top">=</span> '+ xResDec + dvx +'<span style="vertical-align:top">.</span>'+ dvx 
			+ pxResDec +'</td></tr><tr><td></td><td>= '+ xRes + '.' + pxRes +'<sub>2</sub></td></tr>'
			+'<tr><tr><td></td><td>= '+xCnkf.join(' &nbsp; &nbsp;')+' &nbsp; &nbsp;. &nbsp; &nbsp;'+xpCnkf.join(' &nbsp; &nbsp;')+'</td></tr>'
			+'<tr><tr><td></td><td><span style="vertical-align:top">=</span> '+hResDec+  dvx +'<span style="vertical-align:top">.</span>'+ dvx + hpResDec + '</td></tr>'
			+'<tr><tr><td></td><td>= '+hRes+'.'+hpRes+'<sub>'+tbase+'</sub></td></tr>'
			+'</table>';
		} else if(raO(_n)) {
			numSeq = _n.toString();
			for(var nX=0, nxLen = numSeq.length; nX < nxLen; nX++){
				digitsX = numSeq.charAt(nX);
				bnumx = parseInt(digitsX, base).toString(2).toUpperCase();
				blen = bnumx.length;
				bmod = blen%nmod;
				if(bmod!=0){
					bneed = blen+nmod-bmod;
					bnumx = raAddr(bnumx, bneed);
				}
				binLine1 = '<div style="display: inline-block"><div style="text-align: center; border-bottom: 1px solid black;">'+ digitsX.toUpperCase() +'</div><div style="text-align: center; padding-top:8px;">'+ bnumx +'</div></div>';
				ntx.push(binLine1);
				binDec.push(bnumx);
			}
			xRes = raRemZ(binDec.join(''));
			xResDec = ntx.join(dvx);
			xCnk = raCnkRev(xRes, tmod);
			xCnkf = raCnkf(xCnk, tmod);
			for(var cnX=0, cnxLen = xCnkf.length; cnX < cnxLen; cnX++) {
				hnumx = parseInt(xCnkf[cnX], 2).toString(tbase).toUpperCase();
				hexLine1 = '<div style="display: inline-block"><div style="text-align: center; border-bottom: 1px solid black;">'+ xCnkf[cnX] +'</div><div style="text-align: center; padding-top:8px;">'+ hnumx +'</div></div>';
				hntx.push(hexLine1);
				hexDec.push(hnumx);
			}
			hRes = hexDec.join('');
			hResDec = hntx.join(dvx);
			return '<span style="font-size:18pt">Hence, ' + _n.toUpperCase() +'<sub>'+ base +'</sub> = '+ hRes 
			+'<sub>'+tbase+'</sub></span><br><table style="font-size: 14pt;"><tr><td valign="top">'+ _n.toUpperCase() +'<sub>'+ base 
			+'</sub></td><td><span style="vertical-align:top">=</span> '+ xResDec +'</td></tr><tr><td></td><td>= '+ xRes +'<sub>2</sub></td></tr>'
			+'<tr><tr><td></td><td>= '+xCnkf.join(' &nbsp; &nbsp;')+'</td></tr>'
			+'<tr><tr><td></td><td><span style="vertical-align:top">=</span> '+hResDec+'</td></tr>'
			+'<tr><tr><td></td><td>= '+hRes+'<sub>'+tbase+'</sub></td></tr>'
			+'</table>';
		} else return 'Please Insert a Valid Octal Number';
	}
	function raHexOct(_n, _){
		var base, tbase, point, numSeq, digitsX, nmod, tmod, blen, bneed, bmod, bnumx, hnumx, hpnumx, hexLine1, hexpLine1, binLine1, hRes, hResDec, xRes, xResDec, binDec = [], ntx = [], hntx = [], hpntx = [], hexDec = [], hexpDec = [], hpRes, hpResDec, pnumSeq, pdigitsX, pblen, pbneed, pbmod, pbnumx, pbinLine1, pxRes, pxResDec, pbinDec = [], pntx = [], xCnk, xCnkf, xpCnk, xpCnkf;
		var dvx = '<div style="display: inline-block; width:20px; height:2px;"></div>';
		point = false;
		base = 16;
		nmod = 4;
		tmod = 3;
		tbase = 8;

		if(_n.toString().indexOf('.') != -1){
			var o0 = _n.split(".");
			var o1 = o0[0];
			var o2 = o0[1];
			if(raH(o1) && raH(o2)) point = true;
		}

		if(point) {
			numSeq = o1.toString();
			for(var nX=0, nxLen = numSeq.length; nX < nxLen; nX++){
				digitsX = numSeq.charAt(nX);
				bnumx = parseInt(digitsX, base).toString(2).toUpperCase();
				blen = bnumx.length;
				bmod = blen%nmod;
				if(bmod!=0){
					bneed = blen+nmod-bmod;
					bnumx = raAddr(bnumx, bneed);
				}
				binLine1 = '<div style="display: inline-block"><div style="text-align: center; border-bottom: 1px solid black;">'+ digitsX.toUpperCase() +'</div><div style="text-align: center; padding-top:8px;">'+ bnumx +'</div></div>';
				ntx.push(binLine1);
				binDec.push(bnumx);
			}
			xRes = raRemZ(binDec.join(''));
			xResDec = ntx.join(dvx);
			xCnk = raCnkRev(xRes, tmod);
			xCnkf = raCnkf(xCnk, tmod);
			for(var cnX=0, cnxLen = xCnkf.length; cnX < cnxLen; cnX++) {
				hnumx = parseInt(xCnkf[cnX], 2).toString(tbase).toUpperCase();
				hexLine1 = '<div style="display: inline-block"><div style="text-align: center; border-bottom: 1px solid black;">'+ xCnkf[cnX] +'</div><div style="text-align: center; padding-top:8px;">'+ hnumx +'</div></div>';
				hntx.push(hexLine1);
				hexDec.push(hnumx);
			}
			hRes = hexDec.join('');
			hResDec = hntx.join(dvx);
			pnumSeq = o2.toString();
			for(var pnX=0, pnxLen = pnumSeq.length; pnX < pnxLen; pnX++) {
				pdigitsX = pnumSeq.charAt(pnX);
				pbnumx = parseInt(pdigitsX, base).toString(2).toUpperCase();
				pblen = pbnumx.length;
				pbmod = pblen%nmod;
				if(pbmod!=0){
					pbneed = pblen+nmod-pbmod;
					pbnumx = raAddr(pbnumx, pbneed);
				}
				pbinLine1 = '<div style="display: inline-block"><div style="text-align: center; border-bottom: 1px solid black;">'+ pdigitsX.toUpperCase() +'</div><div style="text-align: center; padding-top:8px;">'+ pbnumx +'</div></div>';
				pntx.push(pbinLine1);
				pbinDec.push(pbnumx);
			}
			pxRes = raRemZ(pbinDec.join(''), true);
			pxResDec = pntx.join(dvx);
			xpCnk = raCnk(pxRes, tmod);
			xpCnkf = raCnkf(xpCnk, tmod, false);
			for(var pnX=0, pnxLen = xpCnkf.length; pnX < pnxLen; pnX++) {
				hpnumx = parseInt(xpCnkf[pnX], 2).toString(tbase).toUpperCase();
				hexpLine1 = '<div style="display: inline-block"><div style="text-align: center; border-bottom: 1px solid black;">'+ xpCnkf[pnX] +'</div><div style="text-align: center; padding-top:8px;">'+ hpnumx +'</div></div>';
				hpntx.push(hexpLine1);
				hexpDec.push(hpnumx);
			}
			hpRes = hexpDec.join('');
			hpResDec = hpntx.join(dvx);
			return '<span style="font-size:18pt">Hence, ' + _n.toUpperCase() +'<sub>'+ base +'</sub> = '+hRes+'.'+hpRes 
			+'<sub>'+tbase+'</sub></span><br><table style="font-size: 14pt;"><tr><td valign="top">'+ _n.toUpperCase() +'<sub>'+ base 
			+'</sub></td><td><span style="vertical-align:top">=</span> '+ xResDec + dvx +'<span style="vertical-align:top">.</span>'+ dvx 
			+ pxResDec +'</td></tr><tr><td></td><td>= '+ xRes + '.' + pxRes +'<sub>2</sub></td></tr>'
			+'<tr><tr><td></td><td>= '+xCnkf.join(' &nbsp; &nbsp;')+' &nbsp; &nbsp;. &nbsp; &nbsp;'+xpCnkf.join(' &nbsp; &nbsp;')+'</td></tr>'
			+'<tr><tr><td></td><td><span style="vertical-align:top">=</span> '+hResDec+  dvx +'<span style="vertical-align:top">.</span>'+ dvx + hpResDec + '</td></tr>'
			+'<tr><tr><td></td><td>= '+hRes+'.'+hpRes+'<sub>'+tbase+'</sub></td></tr>'
			+'</table>';
		} else if(raH(_n)) {
			numSeq = _n.toString();
			for(var nX=0, nxLen = numSeq.length; nX < nxLen; nX++){
				digitsX = numSeq.charAt(nX);
				bnumx = parseInt(digitsX, base).toString(2).toUpperCase();
				blen = bnumx.length;
				bmod = blen%nmod;
				if(bmod!=0){
					bneed = blen+nmod-bmod;
					bnumx = raAddr(bnumx, bneed);
				}
				binLine1 = '<div style="display: inline-block"><div style="text-align: center; border-bottom: 1px solid black;">'+ digitsX.toUpperCase() +'</div><div style="text-align: center; padding-top:8px;">'+ bnumx +'</div></div>';
				ntx.push(binLine1);
				binDec.push(bnumx);
			}
			xRes = raRemZ(binDec.join(''));
			xResDec = ntx.join(dvx);
			xCnk = raCnkRev(xRes, tmod);
			xCnkf = raCnkf(xCnk, tmod);
			for(var cnX=0, cnxLen = xCnkf.length; cnX < cnxLen; cnX++) {
				hnumx = parseInt(xCnkf[cnX], 2).toString(tbase).toUpperCase();
				hexLine1 = '<div style="display: inline-block"><div style="text-align: center; border-bottom: 1px solid black;">'+ xCnkf[cnX] +'</div><div style="text-align: center; padding-top:8px;">'+ hnumx +'</div></div>';
				hntx.push(hexLine1);
				hexDec.push(hnumx);
			}
			hRes = hexDec.join('');
			hResDec = hntx.join(dvx);
			return '<span style="font-size:18pt">Hence, ' + _n.toUpperCase() +'<sub>'+ base +'</sub> = '+ hRes 
			+'<sub>'+tbase+'</sub></span><br><table style="font-size: 14pt;"><tr><td valign="top">'+ _n.toUpperCase() +'<sub>'+ base 
			+'</sub></td><td><span style="vertical-align:top">=</span> '+ xResDec +'</td></tr><tr><td></td><td>= '+ xRes +'<sub>2</sub></td></tr>'
			+'<tr><tr><td></td><td>= '+xCnkf.join(' &nbsp; &nbsp;')+'</td></tr>'
			+'<tr><tr><td></td><td><span style="vertical-align:top">=</span> '+hResDec+'</td></tr>'
			+'<tr><tr><td></td><td>= '+hRes+'<sub>'+tbase+'</sub></td></tr>'
			+'</table>';
		} else return 'Please Insert a Valid Octal Number';
	}

	// Utilities
	function raAddr(n,r,z=0) {
		n=n+''; return n.length >= r ? n : new Array(r - n.length + 1).join(z) + n;
	}
	function raAddrR(n,r,z=0) {
		n=n+''; return n.length >= r ? n : n + new Array(r - n.length + 1).join(z);
	}
	function raCnkf(c, f, l = true) {
		return c.map(function(n) {
			var ln = n.toString().length;
			var md = ln%f;
			return md!=0?(l?raAddr(n, (ln+f-md)):raAddrR(n, (ln+f-md))):n;
		});
	}
	function _raHexdecode(_n){
		return _n.toString(16).toUpperCase();;
	}
	function raRemZ(_n, r = false){
		var _e = r ? /\.*0+$/ : /^0+/;
		return _n.toString().replace(_e,'');
	}
	function raCnk(_n, s = 3) {
		return _n.toString()
		.match(new RegExp(".{1,"+s+"}", "g"));
	}
	function raCnkRev(_n, s = 3) {
		return _n.toString()
		.split('')
		.reverse()
		.join('')
		.match(new RegExp(".{1,"+s+"}", "g"))
		.reverse()
		.map(function(x) {
			return x.split('')
			.reverse()
			.join('')
		});
	}

	// Verifier
	function raH(b) {
		var a = parseInt(b,16); return (b.search(/^[0123456789abcdefABCDEF]+$/) != -1);
	}
	function raB(b) {
		return (b.search(/^[10]+$/) != -1);
	}
	function raO(b) {
		var a = parseInt(b,8);
		return (b.search(/^[01234567]+$/) != -1);
	}
});