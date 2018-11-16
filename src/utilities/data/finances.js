function FinanceData(whichYear) {

	finances = new Array();

	if (whichYear == "2010") {
		finances[0] = new FinanceDetails("","c/f from 2007-2010","",0,0,0,0);
		finances[1] = new FinanceDetails("01","","Martin",40,6,0,0);
		finances[2] = new FinanceDetails("02","","Jack, Martin",0,23.9,0,0);
		finances[3] = new FinanceDetails("03","","Jack, Martin",40,5.6,0,10.7);
		finances[4] = new FinanceDetails("04","","Jack, Martin",40,0,0,0);
		finances[5] = new FinanceDetails("05","","All",0,0,0,0);
		finances[6] = new FinanceDetails("06","","Steve",40,7.4,0,11.95);

	} else if (whichYear == "2007") {
		finances[0] = new FinanceDetails("","c/f from 2006","",-4.84,0,0,0);
		finances[1] = new FinanceDetails("01","","Dave, Martin, Steve",40,6.5,15,5.25);
		finances[2] = new FinanceDetails("02","","Dave",40,5.4,0,13.5);
		finances[3] = new FinanceDetails("03","","Martin",0,5.65,0,7.85);
		finances[4] = new FinanceDetails("04","","All",0,0,0,0);
		finances[5] = new FinanceDetails("05","","Steve",0,6,2,0);
		finances[6] = new FinanceDetails("06","","Jack",40,0,10.25,11.6);
		finances[7] = new FinanceDetails("07","","Dave, Martin",0,0,12.07,11.3);
		finances[8] = new FinanceDetails("08","","Steve, Martin",40,0,0,12.25);
		finances[9] = new FinanceDetails("09","","Dave, Martin",0,16.40,0,12.50);
		finances[10] = new FinanceDetails("10","","Dave",40,4,15,4.60);
		finances[11] = new FinanceDetails("11","","Jack, Steve, Martin",40,0,15.2,12.35);
		finances[12] = new FinanceDetails("12","","Dave, Steve",0,10,5.5,0);
		finances[13] = new FinanceDetails("13","","Steve",40,27.4,0,0);
		finances[14] = new FinanceDetails("14","","Jack, Martin",0,0,16.2,13.35);
		finances[15] = new FinanceDetails("15","","Steve, Martin",40,20,0,16.6);
		finances[16] = new FinanceDetails("16","","Martin",40,0,0,15.5);
		finances[17] = new FinanceDetails("17","","Steve",0,0,11.8,2.6);
		finances[18] = new FinanceDetails("18","","All",0,0,0,0);
		finances[19] = new FinanceDetails("19","","Steve",0,0,0,0);
		finances[20] = new FinanceDetails("20","","Steve",0,0,0,0);

	} else if (whichYear == "2006") {
		finances[0] = new FinanceDetails("","c/f from 2005","",27.26,0,0,0);
		finances[1] = new FinanceDetails("01","","Steve",0,0,0,0);
		finances[2] = new FinanceDetails("02","","Dave, Martin, Steve",0,0,0,0);
		finances[3] = new FinanceDetails("03","","Martin",0,0,4.4,0);
		finances[4] = new FinanceDetails("04","","Dave",0,4.95,0,9.8);
		finances[5] = new FinanceDetails("05","","Jack",40,5,4,10.1);
		finances[6] = new FinanceDetails("06","","Dave, Steve",0,15,6.8,8);
		finances[7] = new FinanceDetails("07","","All",0,0,0,0);
		finances[8] = new FinanceDetails("08","","Dave",40,5.2,15.6,10);
		finances[9] = new FinanceDetails("09","","Martin",20,6.75,6.3,8.75);
		finances[10] = new FinanceDetails("10","","Jack",20,4,0,12.6);
		finances[11] = new FinanceDetails("11","","Dave, Martin",20,4.4,5,13.1);
		finances[12] = new FinanceDetails("12","","All",0,0,0,0);
		finances[13] = new FinanceDetails("13","","Martin",40,6,0,16.85);
		finances[14] = new FinanceDetails("14","","Dave",0,0,0,13.85);
		finances[15] = new FinanceDetails("15","","Jack, Martin",40,3.75,0,16.95);
		finances[16] = new FinanceDetails("16","","Dave",0,4.8,4.4,11.6);
		finances[17] = new FinanceDetails("17","","Steve",40,7.2,7.4,11.8);
		finances[18] = new FinanceDetails("18","","Martin",0,2,4.9,12.55);
		finances[19] = new FinanceDetails("19","","Jack",40,0,0,9.45);
		finances[20] = new FinanceDetails("20","","Dave",0,27.90,0,10.95);

	} else if (whichYear == "2005") {
		finances[0] = new FinanceDetails("","c/f from 2004","",-7.4,0,0,0);
		finances[1] = new FinanceDetails("01","","Dave",40,0,0,7.15);
		finances[2] = new FinanceDetails("02","","Jack",0,0,13.5,9.2);
		finances[3] = new FinanceDetails("03","","Martin",40,8.74,4.7,8.55);
		finances[4] = new FinanceDetails("04","","Dave, Martin",0,0,0,0);
		finances[5] = new FinanceDetails("05","","Jack",40,12.65,0,0);
		finances[6] = new FinanceDetails("06","","Dave, Martin",0,3.95,0,0);
		finances[7] = new FinanceDetails("07","","Dave",0,0,28.1,6.35);
		finances[8] = new FinanceDetails("08","","Steve",0,0,0,0);
		finances[9] = new FinanceDetails("09","","Dave",40,6,6.8,0);
		finances[10] = new FinanceDetails("10","","Steve",0,0,2,0);
		finances[11] = new FinanceDetails("11","","Martin",0,3.6,12,9.4);
		finances[12] = new FinanceDetails("12","","Dave, Martin, Steve",0,0,0,0);
		finances[13] = new FinanceDetails("13","","Dave, Martin, Steve",0,0,0,0);
		finances[14] = new FinanceDetails("8-Oct","Goodwood","Martin",40,11.2,6.1,9.6);
		finances[15] = new FinanceDetails("14","","Jack",0,6.2,0,7.8);
		finances[16] = new FinanceDetails("15","","Dave",0,18,0,0);
		finances[17] = new FinanceDetails("16","","Martin",40,11.4,0,13.3);
		finances[18] = new FinanceDetails("17","","Steve",0,4,0,5.15);
		finances[19] = new FinanceDetails("18","","Dave, Jack, Steve",40,1.95,0,0);
		finances[20] = new FinanceDetails("19","","Dave",0,14.7,5.55,0);
		finances[21] = new FinanceDetails("1-Apr-06","Rookwood","Martin",0,0,0,7.2);
		finances[22] = new FinanceDetails("20","","Dave",40,6,5.5,9);

	} else if (whichYear == "2004") {
		finances[0] = new FinanceDetails("6-Feb","Goodwood","Dave, Steve",40,6,4,7.2);
		finances[1] = new FinanceDetails("28-Feb","Goodwood","Jack, Steve",40,9,4,7.9);
		finances[2] = new FinanceDetails("13-Mar","Chichester","Martin",40,4.6,0,7.65);
		finances[3] = new FinanceDetails("27-Mar","Gatton Manor","Dave, Jack",0,21.99,0,0);
		finances[4] = new FinanceDetails("01","","Martin",40,2.9,13.4,12.2);
		finances[5] = new FinanceDetails("02","","Steve",40,0,0,14.4);
		finances[6] = new FinanceDetails("03","","Dave",0,10,4,24.53);
		finances[7] = new FinanceDetails("04","","Dave",40,3.5,30.4,8.6);
		finances[8] = new FinanceDetails("05","","Dave",40,4,0,0);
		finances[9] = new FinanceDetails("06","","Martin",0,4,0,0);
		finances[10] = new FinanceDetails("07","","Dave, Jack, Martin",0,0,0,0);
		finances[11] = new FinanceDetails("08","","Dave",0,0,0,13);
		finances[12] = new FinanceDetails("09","","Steve",40,4,24,10.8);
		finances[13] = new FinanceDetails("10","","Martin",0,0,0,2.8);
		finances[14] = new FinanceDetails("11","","Jack",0,6,5,19.4);
		finances[15] = new FinanceDetails("12","","Dave",40,3,0,7.7);
		finances[16] = new FinanceDetails("13","","Martin",0,6,0,12.4);
		finances[17] = new FinanceDetails("14","","Dave",0,7.4,0,5.2);
		finances[18] = new FinanceDetails("15","","Martin",0,4,0,6);
		finances[19] = new FinanceDetails("16","","Martin",0,0,0,18.5);
		finances[20] = new FinanceDetails("17","","Steve",40,6.4,13.43,9.2);
		finances[21] = new FinanceDetails("18","","Jack",20,2.4,2.9,11.1);
		finances[22] = new FinanceDetails("19","","Dave, Martin",40,5,0,0);
		finances[23] = new FinanceDetails("26-Feb-05","Chichester","Dave",0,4.55,0,5.95);
		finances[24] = new FinanceDetails("20","","Dave",0,0,34.8,12.2);
		}
	}
