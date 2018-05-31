//backg_static.js
// 10may2018 rca 
// these are the static parts of the game, inclde them at the top of any list of js 
// files that 
// 
// p1 = k1, b1, p1status = black = positive numbers
// p2 = k2, b2, p2status = white = negative numbers


var black_piece = "<img src='img/bp.gif' alt='X'>";
var white_piece = "<img src='img/wp.gif' alt='X'>";
var br = "<br />";


    // this gets a string argument line the short names below
    // * backgammon
    // * nackgammon
    // * hypergammon
    // * longgammon
    // * dutchgammon
    // 
    // return one of these boards. 
//    var boards = {};
    var boards = [];

//##########################################################################
    // traditional backgammon
    boards['backgammon']  =   { 
        'long':'Trad. Backgammon',
        'short':'backgammon',
        'b1':0,'b2':0,'k1':0,'k2':0,
        'url':'http://www.bkgm.com/rules.html',
        "01":-2, "02":0, "03":0, "04":0, "05":0, "06":5, 
        "07":0, "08":3, "09":0, "10":0, "11":0, "12":-5,
        "13":5, "14":0, "15":0,"16":0, "17":-3, "18":0,
        "19":-5, "20":0, "21":0, "22":0, "23":0,"24":2};
        // 13 14 15 16 17 18 19 20 21 22 23 24
        // +5  0  0  0 -3  0 -5  0  0  0  0 +2
        //  V  V  V  V  V  V  V  V  V  V  V  V 
        //  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^ 
        // -5  0  0  0 +3  0 +5  0  0  0  0 -2
        // 12 11 10 09 08 07 06 05 04 03 02 01 

//##########################################################################
    boards['longgammon'] =   {  'long':'LongGammon',
        'short':'longgammon',
        'b1':0,'b2':0,'k1':0,'k2':0,
        'url':'http://www.bkgm.com/variants/LongGammon.html',
        "01":-15, "02":0, "03":0, "04":0, "05":0, "06":0, 
        "07":0, "08":0, "09":0, "10":0, "11":0, "12":0,
        "13":0, "14":0, "15":0,"16":0, "17":0, "18":0,
        "19":0, "20":0, "21":0, "22":0, "23":0,"24":15};
        // 13 14 15 16 17 18 19 20 21 22 23 24
        //  0  0  0  0  0  0  0  0  0  0 0 +15
        //  V  V  V  V  V  V  V  V  V  V  V  V 
        //  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^ 
        //  0  0  0  0  0  0  0  0  0  0  0 -15
        // 12 11 10 09 08 07 06 05 04 03 02 01 

//##########################################################################
    boards['dutchgammon'] =   { 'long':'Dutch Backgammon',
        'short':'dutchgammon',
        'b1':0,'b2':0,'k1':-15,'k2':15,
        'url':'http://www.bkgm.com/variants/DutchBackgammon.html',
        "01":0, "02":0, "03":0, "04":0, "05":0, "06":0, 
        "07":0, "08":0, "09":0, "10":0, "11":0, "12":0,
        "13":0, "14":0, "15":0,"16":0, "17":0, "18":0,
        "19":0, "20":0, "21":0, "22":0, "23":0,"24":0};
        // 13 14 15 16 17 18 19 20 21 22 23 24
        //  0  0  0  0  0  0  0  0  0 +1 +1 +1
        //  V  V  V  V  V  V  V  V  V  V  V  V 
        //  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^ 
        //  0  0  0  0  0  0  0  0  0 -1 -1 -1
        // 12 11 10 09 08 07 06 05 04 03 02 01 

//##########################################################################
    boards['hypergammon'] =   {  'long':'Hyper-backgammon',
        'short':'hypergammon',
        'b1':0,'b2':0,'k1':0,'k2':0,
        'url':' http://www.bkgm.com/variants/HyperBackgammon.html',
        "01":-1, "02":-1, "03":-1, "04":0, "05":0, "06":0, 
        "07":0, "08":0, "09":0, "10":0, "11":0, "12":0,
        "13":0, "14":0, "15":0,"16":0, "17":0, "18":0,
        "19":0, "20":0, "21":0, "22":1, "23":1,"24":1};
        // 13 14 15 16 17 18 19 20 21 22 23 24
        //  0  0  0  0  0  0  0  0  0 +1 +1 +1
        //  V  V  V  V  V  V  V  V  V  V  V  V 
        //  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^ 
        //  0  0  0  0  0  0  0  0  0 -1 -1 -1
        // 12 11 10 09 08 07 06 05 04 03 02 01 

//##########################################################################
    boards['nackgammon'] =   {  'long':'Nackgammon',
        'short':'nackgammon',
        'b1':0,'b2':0,'k1':0,'k2':0,
        'url':'http://www.bkgm.com/variants/Nackgammon.html',
        "01":-2, "02":-2, "03":0, "04":0, "05":0, "06":4, 
        "07":0, "08":3, "09":0, "10":0, "11":0, "12":-4,
        "13":4, "14":0, "15":0,"16":0, "17":-3, "18":0,
        "19":-4, "20":0, "21":0, "22":0, "23":2,"24":2};
        // 13 14 15 16 17 18 19 20 21 22 23 24
        // +4  0  0  0 -3  0 -4  0  0  0 +2 +2
        //  V  V  V  V  V  V  V  V  V  V  V  V 
        //  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^ 
        // -4  0  0  0 +3  0 +4  0  0  0 -2 -2
        // 12 11 10 09 08 07 06 05 04 03 02 01 

//###################################********
    var boardlayout = [];

    boardlayout['whiteleft'] = 
    "<table>\
        <tr>\
            <th rowspan=6 id='sidepanel' style='background-color: #fa0;'></th>\
            <td rowspan=3 id='k1' style='background-color: #FA0;'></td>\
            <th colspan=13 id='p1status' style='background-color: #FA0;'>&nbsp;</th>\
            <td rowspan=6 id='rightpanel' style='background-color: #FA0;'></td>\
            <th rowspan=6 id='sidepanel' style='background-color: #FA0;'></th>\
        </tr>\
        <tr style='background-color: #FA0;'>\
        <th>01</th>\
        <th>02</th>\
        <th>03</th>\
        <th>04</th>\
        <th>05</th>\
        <th>06</th>\
            <th id='b1' rowspan=2 width='30' style='background-color: #FA0;'>e<br>m<br>p<br>t<br>y</th>\
        <th>07</th>\
        <th>08</th>\
        <th>09</th>\
        <th>10</th>\
        <th>11</th>\
        <th>12</th>\
        </tr>\
        <tr>\
        <td id='01' valign='top' align='center' background='img/t1.png'></td>\
        <td id='02' valign='top' align='center' background='img/t2.png'></td>\
        <td id='03' valign='top' align='center' background='img/t1.png'></td>\
        <td id='04' valign='top' align='center' background='img/t2.png'></td>\
        <td id='05' valign='top' align='center' background='img/t1.png'></td>\
        <td id='06' valign='top' align='center' background='img/t2.png'></td>\
        <td id='07' valign='top' align='center' background='img/t1.png'></td>\
        <td id='08' valign='top' align='center' background='img/t2.png'></td>\
        <td id='09' valign='top' align='center' background='img/t1.png'></td>\
        <td id='10' valign='top' align='center' background='img/t2.png'></td>\
        <td id='11' valign='top' align='center' background='img/t1.png'></td>\
        <td id='12' valign='top' align='center' background='img/t2.png'></td>\
    </tr>\
    <tr>\
        <td rowspan=3 id='k2' style='background-color: #FA0;'></td>\
        <td id='24' valign='bottom' align='center' background='img/m2.png'></td>\
        <td id='23' valign='bottom' align='center' background='img/m1.png'></td>\
        <td id='22' valign='bottom' align='center' background='img/m2.png'></td>\
        <td id='21' valign='bottom' align='center' background='img/m1.png'></td>\
        <td id='20' valign='bottom' align='center' background='img/m2.png'></td>\
        <td id='19' valign='bottom' align='center' background='img/m1.png'></td>\
                    <th id='b2' rowspan=2 width='30' style='background-color: #FA0;'>e<br>m<br>p<br>t<br>y</th>\
        <td id='18' valign='bottom' align='center' background='img/m2.png'></td>\
        <td id='17' valign='bottom' align='center' background='img/m1.png'></td>\
        <td id='16' valign='bottom' align='center' background='img/m2.png'></td>\
        <td id='15' valign='bottom' align='center' background='img/m1.png'></td>\
        <td id='14' valign='bottom' align='center' background='img/m2.png'></td>\
        <td id='13' valign='bottom' align='center' background='img/m1.png'></td>\
    </tr>\
    <tr style='background-color: #FA0;'>\
        <th>24</th>\
        <th>23</th>\
        <th>22</th>\
        <th>21</th>\
        <th>20</th>\
        <th>19</th>\
        <th>18</th>\
        <th>17</th>\
        <th>16</th>\
        <th>15</th>\
        <th>14</th>\
        <th>13</th>\
    </tr>\
    <tr>\
        <th id='p2status' colspan='13' style='background-color: #FA0;'>&nbsp;</th>\
    </tr>\
    </table>";
    //#### BOARD2
    boardlayout['whiteright'] = 
    "<table>\
        <tr>\
            <th rowspan=6 id='sidepanel' style='background-color: #728;'></th>\
            <td rowspan=3 id='k1' style='background-color: #FA0;'></td>\
            <th colspan=13 id='p1status' style='background-color: #FA0;'>&nbsp;</th>\
            <td rowspan=6 id='rightpanel' style='background-color: #FA0;'></td>\
            <th rowspan=6 id='sidepanel' style='background-color: #728;'></th>\
        </tr>\
        <tr style='background-color: #FA0;'>\
        <th>12</th>\
        <th>11</th>\
        <th>10</th>\
        <th>09</th>\
        <th>08</th>\
        <th>07</th>\
            <th id='b1' rowspan=2 width='30' style='background-color: #FA0;'>e<br>m<br>p<br>t<br>y</th>\
        <th>06</th>\
        <th>05</th>\
        <th>04</th>\
        <th>03</th>\
        <th>02</th>\
        <th>01</th>\
        </tr>\
        <tr>\
        <td id='12' valign='top' align='center' background='img/t1.png' ></td>\
        <td id='11' valign='top' align='center' background='img/t2.png' ></td>\
        <td id='10' valign='top' align='center' background='img/t1.png' ></td>\
        <td id='09' valign='top' align='center' background='img/t2.png' ></td>\
        <td id='08' valign='top' align='center' background='img/t1.png' ></td>\
        <td id='07' valign='top' align='center' background='img/t2.png' ></td>\
        <td id='06' valign='top' align='center' background='img/t1.png' ></td>\
        <td id='05' valign='top' align='center' background='img/t2.png' ></td>\
        <td id='04' valign='top' align='center' background='img/t1.png' ></td>\
        <td id='03' valign='top' align='center' background='img/t2.png' ></td>\
        <td id='02' valign='top' align='center' background='img/t1.png' ></td>\
        <td id='01' valign='top' align='center' background='img/t2.png' ></td>\
    </tr>\
    <tr>\
        <td rowspan=3 id='k2' style='background-color: #FA0;'></td>\
        <td id='13' valign='bottom' align='center' background='img/m2.png' ></td>\
        <td id='14' valign='bottom' align='center' background='img/m1.png' ></td>\
        <td id='15' valign='bottom' align='center' background='img/m2.png' ></td>\
        <td id='16' valign='bottom' align='center' background='img/m1.png' ></td>\
        <td id='17' valign='bottom' align='center' background='img/m2.png' ></td>\
        <td id='18' valign='bottom' align='center' background='img/m1.png' ></td>\
                    <th id='b2' rowspan=2 width='30' style='background-color: #FA0;'>e<br>m<br>p<br>t<br>y</th>\
        <td id='19' valign='bottom' align='center' background='img/m2.png' ></td>\
        <td id='20' valign='bottom' align='center' background='img/m1.png' ></td>\
        <td id='21' valign='bottom' align='center' background='img/m2.png' ></td>\
        <td id='22' valign='bottom' align='center' background='img/m1.png' ></td>\
        <td id='23' valign='bottom' align='center' background='img/m2.png' ></td>\
        <td id='24' valign='bottom' align='center' background='img/m1.png' ></td>\
        </td>\
    </tr>\
    <tr style='background-color: #FA0;'>\
        <th>13</th>\
        <th>14</th>\
        <th>15</th>\
        <th>16</th>\
        <th>17</th>\
        <th>18</th>\
        <th>19</th>\
        <th>20</th>\
        <th>21</th>\
        <th>22</th>\
        <th>23</th>\
        <th>24</th>\
    </tr>\
    <tr>\
        <th id='p2status' colspan='13' style='background-color: #FA0;'>&nbsp;</th>\
    </tr>\
    </table>";
    //####
    boardlayout['blackleft'] = 
    "<table>\
        <tr>\
            <th rowspan=6 id='sidepanel'></th>\
            <td rowspan=3 id='k2' style='background-color: #FA0;'></td>\
            <th colspan=13 id='p1status' style='background-color: #FA0;'>&nbsp;</th>\
            <td rowspan=6 id='rightpanel' style='background-color: #FA0;'></td>\
            <th rowspan=6 id='sidepanel' style='background-color: #FA0;'></th>\
        </tr>\
    <tr style='background-color: #FA0;'>\
        <th>24</th>\
        <th>23</th>\
        <th>22</th>\
        <th>21</th>\
        <th>20</th>\
        <th>19</th>\
            <th id='b2' rowspan=2 width='30'style='background-color: #FA0;'>e<br>m<br>p<br>t<br>y</th>\
        <th>18</th>\
        <th>17</th>\
        <th>16</th>\
        <th>15</th>\
        <th>14</th>\
        <th>13</th>\
    </tr>\
        <tr>\
        <td id='24' valign='top' align='center' background='img/t2.png'></td>\
        <td id='23' valign='top' align='center' background='img/t1.png'></td>\
        <td id='22' valign='top' align='center' background='img/t2.png'></td>\
        <td id='21' valign='top' align='center' background='img/t1.png'></td>\
        <td id='20' valign='top' align='center' background='img/t2.png'></td>\
        <td id='19' valign='top' align='center' background='img/t1.png'></td>\
        <td id='18' valign='top' align='center' background='img/t2.png'></td>\
        <td id='17' valign='top' align='center' background='img/t1.png'></td>\
        <td id='16' valign='top' align='center' background='img/t2.png'></td>\
        <td id='15' valign='top' align='center' background='img/t1.png'></td>\
        <td id='14' valign='top' align='center' background='img/t2.png'></td>\
        <td id='13' valign='top' align='center' background='img/t1.png'></td>\
    </tr>\
    <tr>\
        <td rowspan=3 id='k1' style='background-color: #FA0;' ></td>\
        <td id='01' valign='bottom' align='center' background='img/m1.png'></td>\
        <td id='02' valign='bottom' align='center' background='img/m2.png'></td>\
        <td id='03' valign='bottom' align='center' background='img/m1.png'></td>\
        <td id='04' valign='bottom' align='center' background='img/m2.png'></td>\
        <td id='05' valign='bottom' align='center' background='img/m1.png'></td>\
        <td id='06' valign='bottom' align='center' background='img/m2.png'></td>\
                    <th id='b1' rowspan=2 width='30' style='background-color: #FA0;'>e<br>m<br>p<br>t<br>y</th>\
        <td id='07' valign='bottom' align='center' background='img/m1.png'></td>\
        <td id='08' valign='bottom' align='center' background='img/m2.png'></td>\
        <td id='09' valign='bottom' align='center' background='img/m1.png'></td>\
        <td id='10' valign='bottom' align='center' background='img/m2.png'></td>\
        <td id='11' valign='bottom' align='center' background='img/m1.png'></td>\
        <td id='12' valign='bottom' align='center' background='img/m2.png'></td>\
    </tr>\
    <tr style='background-color: #FA0;'>\
        <th>01</th>\
        <th>02</th>\
        <th>03</th>\
        <th>04</th>\
        <th>05</th>\
        <th>06</th>\
        <th>07</th>\
        <th>08</th>\
        <th>09</th>\
        <th>10</th>\
        <th>11</th>\
        <th>12</th>\
    </tr>\
    <tr>\
        <th id='p2status' colspan='13' style='background-color: #FA0;'>&nbsp;</th>\
    </tr>\
    </table>";
    //########################################################################
    boardlayout['blackright'] = 
    "<table border=2>\
        <tr>\
            <th rowspan=6 id='sidepanel' style='background-color: #728;'></th>\
            <td rowspan=3 id='k2' style='background-color: #FA0;'></td>\
            <th colspan=13 id='p1status' style='background-color: #FA0;'>&nbsp;</th>\
            <td rowspan=6 id='rightpanel' style='background-color: #FA0;'></td>\
            <th rowspan=6 id='sidepanel' style='background-color: #728;'></th>\
        </tr>\
        <tr style='background-color: #FA0;'>\
            <th>13</td>\
            <th>14</td>\
            <th>15</td>\
            <th>16</td>\
            <th>17</td>\
            <th>18</td>\
                <th id='b2' rowspan=2 width='30' style='background-color: #FA0;'>e<br>m<br>p<br>t<br>y</th>\
            <th>19</td>\
            <th>20</td>\
            <th>21</td>\
            <th>22</td>\
            <th>23</td>\
            <th>24</td>\
        </tr>\
        <tr>\
            <td id='13' valign='top' align='center' background='img/t2.png' ></td>\
            <td id='14' valign='top' align='center' background='img/t1.png' ></td>\
            <td id='15' valign='top' align='center' background='img/t2.png' ></td>\
            <td id='16' valign='top' align='center' background='img/t1.png' ></td>\
            <td id='17' valign='top' align='center' background='img/t2.png' ></td>\
            <td id='18' valign='top' align='center' background='img/t1.png' ></td>\
            <td id='19' valign='top' align='center' background='img/t2.png' ></td>\
            <td id='20' valign='top' align='center' background='img/t1.png' ></td>\
            <td id='21' valign='top' align='center' background='img/t2.png' ></td>\
            <td id='22' valign='top' align='center' background='img/t1.png' ></td>\
            <td id='23' valign='top' align='center' background='img/t2.png' ></td>\
            <td id='24' valign='top' align='center' background='img/t1.png' ></td>\
        </tr>\
        <tr>\
            <td rowspan=3 id='k1' style='background-color: #FA0;'></td>\
            <td id='12' valign='bottom' align='center' background='img/m1.png' ></td>\
            <td id='11' valign='bottom' align='center' background='img/m2.png' ></td>\
            <td id='10' valign='bottom' align='center' background='img/m1.png' ></td>\
            <td id='09' valign='bottom' align='center' background='img/m2.png' ></td>\
            <td id='08' valign='bottom' align='center' background='img/m1.png' ></td>\
            <td id='07' valign='bottom' align='center' background='img/m2.png' ></td>\
                    <th id='b1' rowspan=2 width='30' style='background-color: #FA0;'>e<br>m<br>p<br>t<br>y</th>\
            <td id='06' valign='bottom' align='center' background='img/m1.png' ></td>\
            <td id='05' valign='bottom' align='center' background='img/m2.png' ></td>\
            <td id='04' valign='bottom' align='center' background='img/m1.png' ></td>\
            <td id='03' valign='bottom' align='center' background='img/m2.png' ></td>\
            <td id='02' valign='bottom' align='center' background='img/m1.png' ></td>\
            <td id='01' valign='bottom' align='center' background='img/m2.png' ></td>\
        </tr>\
        <tr style='background-color: #FA0;'>\
            <th>12</td>\
            <th>11</td>\
            <th>10</td>\
            <th>09</td>\
            <th>08</td>\
            <th>07</td>\
            <th>06</td>\
            <th>05</td>\
            <th>04</td>\
            <th>03</td>\
            <th>02</td>\
            <th>01</td>\
        </tr>\
        <tr>\
            <th id='p2status' colspan='13' style='background-color: #FA0;'>&nbsp;</th>\
        </tr>\
    </table>";
    