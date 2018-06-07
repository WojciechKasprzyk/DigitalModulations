import { Component, OnInit, Input } from '@angular/core';
import { Modulation } from '../../interfaces/interfaces';

@Component({
    selector: 'constellation',
    template: `
        <div [ngSwitch]="modulation">
            <svg *ngSwitchCase="'BPSK'" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="191px" height="184.667px" viewBox="0 0 191 184.667" enable-background="new 0 0 191 184.667" xml:space="preserve">
                <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="88" y1="8.667" x2="88" y2="184.667"/>
                <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="4.667" y1="97.667" x2="177.333" y2="97.667"/>
                <circle fill="#F47751" cx="33.5" cy="97.167" r="6.167"/>
                <circle fill="#F47751" cx="150.667" cy="97.333" r="6.167"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M80.333,18"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88,8.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M98.333,18"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M80.333,18"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M70.5,47.5"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M98.333,18"/>
                <rect x="23.333" y="108.5" fill="none" width="33" height="23"/>
                <text transform="matrix(1 0 0 1 23.3333 117.3828)" font-family="'MyanmarText'" font-size="12">-1</text>
                <rect x="147" y="108.5" fill="none" width="33" height="23"/>
                <text transform="matrix(1 0 0 1 147 117.3828)" font-family="'MyanmarText'" font-size="12">1</text>
                <rect x="29.333" y="78" fill="none" width="49" height="44"/>
                <text transform="matrix(1 0 0 1 29.3333 86.8828)" fill="#F47751" font-family="'MyanmarText'" font-size="12">0</text>
                <rect x="147" y="78" fill="none" width="33" height="23"/>
                <text transform="matrix(1 0 0 1 147 86.8828)" fill="#F47751" font-family="'MyanmarText'" font-size="12">1</text>
                <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="501.5" y1="54.5" x2="501.5" y2="60"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M132,122"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M114,4.5"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M84.333,12"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88,8.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M91.25,11.917"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88,8.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M84.333,11.917"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M91.25,11.917"/>
                <polygon stroke="#000000" stroke-miterlimit="10" points="84.946,9.135 88,3.845 91.054,9.135 "/>
                <polygon stroke="#000000" stroke-miterlimit="10" points="177.477,100.296 177.345,94.235 182.74,97.196 "/>
                <rect x="96" y="4.5" fill="none" width="72" height="100"/>
                <text transform="matrix(1 0 0 1 96 13.3828)" font-family="'MyanmarText'" font-size="12">Q</text>
                <polygon fill="none" points="201.424,124.959 186.5,124.5 172.5,104.5 197.5,104.5 "/>
                <text transform="matrix(1 0 0 1 178.7148 113.3828)" font-family="'MyanmarText'" font-size="12">I</text>
            </svg>
            <svg *ngSwitchCase="'QPSK'" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="191px" height="184.667px" viewBox="0 0 191 184.667" enable-background="new 0 0 191 184.667" xml:space="preserve">
                <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="88" y1="8.667" x2="88" y2="184.667"/>
                <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="4.667" y1="98" x2="177.333" y2="98"/>
                <path fill="#F47751" d="M156.833,97.333"/>
                <path fill="#F47751" d="M150.667,91.167"/>
                <path fill="#F47751" d="M144.5,97.333"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M80.333,18"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88,8.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M98.333,18"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M80.333,18"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M70.5,47.5"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M98.333,18"/>
                <rect x="147" y="108.5" fill="none" width="33" height="23"/>
                <polygon fill="none" points="172.5,63.833 138.417,80 139,45.333 160.5,45.333 "/>
                <text transform="matrix(1 0 0 1 138.9849 54.2161)" fill="#F47751" font-family="'MyanmarText'" font-size="12">00</text>
                <polyline fill="none" points="147,78 180,78 180,101 147,101 "/>
                <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="501.5" y1="54.5" x2="501.5" y2="60"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M132,122"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M114,4.5"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M84.333,12"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88,8.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M91.25,11.917"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88,8.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M84.333,11.917"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M91.25,11.917"/>
                <polygon stroke="#000000" stroke-miterlimit="10" points="84.946,9.135 88,3.845 91.054,9.135 "/>
                <polygon stroke="#000000" stroke-miterlimit="10" points="177.477,100.296 177.345,94.235 182.74,97.196 "/>
                <rect x="96" y="4.5" fill="none" width="72" height="100"/>
                <text transform="matrix(1 0 0 1 96 13.3828)" font-family="'MyanmarText'" font-size="12">Q</text>
                <polygon fill="none" points="201.424,124.959 186.5,124.5 172.5,104.5 197.5,104.5 "/>
                <text transform="matrix(1 0 0 1 178.7148 113.3828)" font-family="'MyanmarText'" font-size="12">I</text>
                <circle fill="#F47751" cx="131" cy="55.5" r="6.167"/>
                <circle fill="#F47751" cx="46.25" cy="55.5" r="6.167"/>
                <circle fill="#F47751" cx="46.25" cy="137.167" r="6.167"/>
                <circle fill="#F47751" cx="131.25" cy="137.167" r="6.167"/>
                <polyline fill="none" points="111,117.333 132.5,117.333 143.5,135.833 "/>
                <polygon fill="none" points="58.125,63.834 24.042,80 25.625,45.334 47.125,45.334 "/>
                <text transform="matrix(1 0 0 1 25.585 54.2161)" fill="#F47751" font-family="'MyanmarText'" font-size="12">01</text>
                <polygon fill="none" points="58.417,158.333 24.333,174.5 25.917,139.833 47.417,139.833 "/>
                <text transform="matrix(1 0 0 1 25.8766 148.7156)" fill="#F47751" font-family="'MyanmarText'" font-size="12">10</text>
                <polygon fill="none" points="170.875,159.334 136.791,175.5 138.375,140.834 159.875,140.834 "/>
                <text transform="matrix(1 0 0 1 138.3346 149.7165)" fill="#F47751" font-family="'MyanmarText'" font-size="12">11</text>
            </svg>
            <svg *ngSwitchCase="'8QAM'" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="191px" height="184.667px" viewBox="0 0 191 184.667" enable-background="new 0 0 191 184.667" xml:space="preserve">
                <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="88" y1="8.667" x2="88" y2="184.667"/>
                <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="4.667" y1="98" x2="177.333" y2="98"/>
                <path fill="#F47751" d="M156.833,97.333"/>
                <path fill="#F47751" d="M150.667,91.167"/>
                <path fill="#F47751" d="M144.5,97.333"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M80.333,18"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88,8.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M98.333,18"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M80.333,18"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M70.5,47.5"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M98.333,18"/>
                <rect x="147" y="108.5" fill="none" width="33" height="23"/>
                <polygon fill="none" points="172.5,63.833 138.417,80 139,45.333 160.5,45.333 "/>
                <text transform="matrix(1 0 0 1 138.9849 54.2161)" fill="#F47751" font-family="'MyanmarText'" font-size="12">001</text>
                <polyline fill="none" points="147,78 180,78 180,101 147,101 "/>
                <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="501.5" y1="54.5" x2="501.5" y2="60"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M132,122"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M114,4.5"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M84.333,12"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88,8.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M91.25,11.917"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88,8.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M84.333,11.917"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M91.25,11.917"/>
                <polygon stroke="#000000" stroke-miterlimit="10" points="84.946,9.135 88,3.845 91.054,9.135 "/>
                <polygon stroke="#000000" stroke-miterlimit="10" points="177.477,100.296 177.345,94.235 182.74,97.196 "/>
                <rect x="96" y="4.5" fill="none" width="72" height="100"/>
                <text transform="matrix(1 0 0 1 96 13.3828)" font-family="'MyanmarText'" font-size="12">Q</text>
                <polygon fill="none" points="201.424,124.959 186.5,124.5 172.5,104.5 197.5,104.5 "/>
                <text transform="matrix(1 0 0 1 178.7148 113.3828)" font-family="'MyanmarText'" font-size="12">I</text>
                <circle fill="#F47751" cx="131" cy="55.5" r="6.167"/>
                <circle fill="#F47751" cx="46.25" cy="55.5" r="6.167"/>
                <circle fill="#F47751" cx="46.25" cy="136.167" r="6.167"/>
                <circle fill="#F47751" cx="131.25" cy="137.167" r="6.167"/>
                <polyline fill="none" points="111,117.333 132.5,117.333 143.5,135.833 "/>
                <polygon fill="none" points="50.042,63.834 15.958,80 17.542,45.334 39.042,45.334 "/>
                <text transform="matrix(1 0 0 1 17.5016 54.2161)" fill="#F47751" font-family="'MyanmarText'" font-size="12">011</text>
                <polygon fill="none" points="50.042,158.333 15.958,174.5 17.542,139.833 39.042,139.833 "/>
                <text transform="matrix(1 0 0 1 17.5016 148.7156)" fill="#F47751" font-family="'MyanmarText'" font-size="12">101</text>
                <polygon fill="none" points="169.875,158.334 135.791,174.5 137.375,139.834 158.875,139.834 "/>
                <text transform="matrix(1 0 0 1 137.3346 148.7165)" fill="#F47751" font-family="'MyanmarText'" font-size="12">111</text>
                <circle fill="#F47751" cx="102" cy="110.667" r="6.167"/>
                <circle fill="#F47751" cx="74" cy="82.667" r="6.167"/>
                <circle fill="#F47751" cx="102" cy="82.667" r="6.167"/>
                <circle fill="#F47751" cx="74" cy="110.667" r="6.167"/>
                <polygon fill="none" points="80.333,88.333 46.25,104.5 47.833,69.833 69.333,69.833 "/>
                <text transform="matrix(1 0 0 1 47.7933 78.7158)" fill="#F47751" font-family="'MyanmarText'" font-size="12">010</text>
                <polygon fill="none" points="141.875,88.333 107.792,104.5 109.375,69.833 130.875,69.833 "/>
                <text transform="matrix(1 0 0 1 109.335 78.7158)" fill="#F47751" font-family="'MyanmarText'" font-size="12">000</text>
                <polygon fill="none" points="80.333,134.333 46.25,150.5 47.833,115.833 69.333,115.833 "/>
                <text transform="matrix(1 0 0 1 47.7933 124.7156)" fill="#F47751" font-family="'MyanmarText'" font-size="12">100</text>
                <polygon fill="none" points="141.875,134.333 107.791,150.5 109.375,115.833 130.875,115.833 "/>
                <text transform="matrix(1 0 0 1 109.3351 124.7156)" fill="#F47751" font-family="'MyanmarText'" font-size="12">110</text>
            </svg>
            <svg *ngSwitchCase="'16QAM'" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="191px" height="184.667px" viewBox="0 0 191 184.667" enable-background="new 0 0 191 184.667" xml:space="preserve">
                <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="88" y1="8.667" x2="88" y2="184.667"/>
                <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="4.667" y1="98" x2="177.333" y2="98"/>
                <path fill="#F47751" d="M156.833,97.333"/>
                <path fill="#F47751" d="M150.667,91.167"/>
                <path fill="#F47751" d="M144.5,97.333"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M80.333,18"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88,8.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M98.333,18"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M80.333,18"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M98.333,18"/>
                <polyline fill="none" points="180,108.5 180,131.5 147,131.5 147,108.5 "/>
                <polyline fill="none" points="147,78 180,78 180,101 147,101 "/>
                <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="501.5" y1="54.5" x2="501.5" y2="60"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M132,122"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M114,4.5"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M84.333,12"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88,8.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M91.25,11.917"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88,8.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M84.333,11.917"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M91.25,11.917"/>
                <polygon stroke="#000000" stroke-miterlimit="10" points="84.946,9.135 88,3.845 91.054,9.135 "/>
                <polygon stroke="#000000" stroke-miterlimit="10" points="177.477,100.296 177.345,94.235 182.74,97.196 "/>
                <rect x="96" y="4.5" fill="none" width="72" height="100"/>
                <text transform="matrix(1 0 0 1 96 13.3828)" font-family="'MyanmarText'" font-size="12">Q</text>
                <polygon fill="none" points="201.424,124.959 186.5,124.5 172.5,104.5 197.5,104.5 "/>
                <text transform="matrix(1 0 0 1 178.7148 113.3828)" font-family="'MyanmarText'" font-size="12">I</text>
                <circle fill="#F47751" cx="129.75" cy="137.167" r="6.167"/>
                <polyline fill="none" points="111,117.333 132.5,117.333 143.5,135.833 "/>
                <circle fill="#F47751" cx="102" cy="110.876" r="6.167"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M114.25,126.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M142,126.667"/>
                <path fill="#F47751" d="M129.75,77.5"/>
                <circle fill="#F47751" cx="129.75" cy="110.876" r="6.167"/>
                <circle fill="#F47751" cx="102" cy="137.043" r="6.167"/>
                <rect x="95" y="44.417" fill="none" width="38.5" height="32.5"/>
                <text transform="matrix(1 0 0 1 95 50.6715)" fill="#F47751" font-family="'MyriadPro-Regular'" font-size="9">0001</text>
                <rect x="94.75" y="70.75" fill="none" width="38.5" height="33.5"/>
                <text transform="matrix(1 0 0 1 94.75 77.0049)" fill="#F47751" font-family="'MyriadPro-Regular'" font-size="9">0000</text>
                <rect x="121.75" y="71.25" fill="none" width="38.5" height="32.5"/>
                <text transform="matrix(1 0 0 1 121.75 77.5049)" fill="#F47751" font-family="'MyriadPro-Regular'" font-size="9">0010</text>
                <polyline fill="none" points="122,108.833 122,131.833 89,131.833 89,108.833 "/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M75,122.333"/>
                <path fill="none" d="M38,4.833"/>
                <line fill="none" x1="110" y1="104.833" x2="39" y2="104.833"/>
                <circle fill="#F47751" cx="72.75" cy="137.5" r="6.167"/>
                <polyline fill="none" points="54,117.667 75.5,117.667 86.5,136.167 "/>
                <circle fill="#F47751" cx="45" cy="111.209" r="6.167"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M57.25,127"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M85,127"/>
                <circle fill="#F47751" cx="72.75" cy="111.209" r="6.167"/>
                <circle fill="#F47751" cx="45" cy="137.376" r="6.167"/>
                <polyline fill="none" points="180,57 180,80 147,80 147,57 "/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M132,70.5"/>
                <circle fill="#F47751" cx="129.75" cy="85.667" r="6.167"/>
                <polyline fill="none" points="111,65.833 132.5,65.833 143.5,84.333 "/>
                <circle fill="#F47751" cx="102" cy="59.376" r="6.167"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M114.25,75.167"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M142,75.167"/>
                <circle fill="#F47751" cx="129.75" cy="59.376" r="6.167"/>
                <circle fill="#F47751" cx="102" cy="85.543" r="6.167"/>
                <polyline fill="none" points="122,57.333 122,80.333 89,80.333 "/>
                <path fill="none" d="M110,53.333"/>
                <polyline fill="none" points="123.25,56.209 123.25,79.209 90.25,79.209 90.25,56.209 "/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M75.25,70.709"/>
                <polyline fill="none" points="111.25,52.209 39.25,53.209 39.25,-47.791 "/>
                <circle fill="#F47751" cx="73" cy="85.543" r="6.167"/>
                <polyline fill="none" points="54.25,66.043 75.75,66.043 86.75,83.543 "/>
                <circle fill="#F47751" cx="45.25" cy="59.376" r="6.167"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M57.5,75.376"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M85.25,74.376"/>
                <circle fill="#F47751" cx="73" cy="59.585" r="6.167"/>
                <circle fill="#F47751" cx="45.25" cy="85.543" r="6.167"/>
                <polyline fill="none" points="65.25,57.543 65.25,80.543 32.25,80.543 "/>
                <line fill="none" x1="53.25" y1="53.543" x2="-17.75" y2="52.543"/>
                <rect x="122" y="44.417" fill="none" width="38.5" height="32.5"/>
                <text transform="matrix(1 0 0 1 122 50.6715)" fill="#F47751" font-family="'MyriadPro-Regular'" font-size="9">0011</text>
                <line fill="none" x1="109" y1="126.417" x2="147.5" y2="126.417"/>
                <rect x="65.083" y="44.417" fill="none" width="38.5" height="32.5"/>
                <text transform="matrix(1 0 0 1 65.0833 50.6715)" fill="#F47751" font-family="'MyriadPro-Regular'" font-size="9">0110</text>
                <rect x="38" y="44.417" fill="none" width="38.5" height="32.5"/>
                <text transform="matrix(1 0 0 1 38 50.6715)" fill="#F47751" font-family="'MyriadPro-Regular'" font-size="9">0111</text>
                <rect x="38" y="71.25" fill="none" width="38.5" height="32.5"/>
                <text transform="matrix(1 0 0 1 38 77.5049)" fill="#F47751" font-family="'MyriadPro-Regular'" font-size="9">0101</text>
                <rect x="65.083" y="71.25" fill="none" width="38.5" height="32.5"/>
                <text transform="matrix(1 0 0 1 65.0833 77.5049)" fill="#F47751" font-family="'MyriadPro-Regular'" font-size="9">0100</text>
                <line fill="none" x1="108" y1="126.25" x2="146.5" y2="126.25"/>
                <line fill="none" x1="108" y1="126.25" x2="146.5" y2="126.25"/>
                <rect x="65.083" y="123.333" fill="none" width="38.5" height="32.5"/>
                <text transform="matrix(1 0 0 1 65.0833 129.5882)" fill="#F47751" font-family="'MyriadPro-Regular'" font-size="9">1001</text>
                <rect x="65.083" y="98.48" fill="none" width="38.5" height="32.5"/>
                <text transform="matrix(1 0 0 1 65.0833 104.7345)" fill="#F47751" font-family="'MyriadPro-Regular'" font-size="9">1000</text>
                <rect x="38" y="123.333" fill="none" width="38.5" height="32.5"/>
                <text transform="matrix(1 0 0 1 38 129.5882)" fill="#F47751" font-family="'MyriadPro-Regular'" font-size="9">1011</text>
                <rect x="38" y="98.48" fill="none" width="38.5" height="32.5"/>
                <text transform="matrix(1 0 0 1 38 104.7345)" fill="#F47751" font-family="'MyriadPro-Regular'" font-size="9">1010</text>
                <rect x="94.75" y="98.48" fill="none" width="38.5" height="32.5"/>
                <text transform="matrix(1 0 0 1 94.75 104.7345)" fill="#F47751" font-family="'MyriadPro-Regular'" font-size="9">1100</text>
                <rect x="122.75" y="123.333" fill="none" width="38.5" height="32.5"/>
                <text transform="matrix(1 0 0 1 122.75 129.5882)" fill="#F47751" font-family="'MyriadPro-Regular'" font-size="9">1111</text>
                <rect x="94.75" y="123.333" fill="none" width="38.5" height="32.5"/>
                <text transform="matrix(1 0 0 1 94.75 129.5882)" fill="#F47751" font-family="'MyriadPro-Regular'" font-size="9">1110</text>
                <rect x="121.75" y="98.48" fill="none" width="38.5" height="32.5"/>
                <text transform="matrix(1 0 0 1 121.75 104.7345)" fill="#F47751" font-family="'MyriadPro-Regular'" font-size="9">1101</text>
            </svg>
            <svg *ngSwitchCase="'64QAM'" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="191px" height="184.667px" viewBox="0 0 191 184.667" enable-background="new 0 0 191 184.667" xml:space="preserve">
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M89.5,140.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M89.5,52.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M134.167,97.333"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M47.833,97.333"/>
                <path fill="#F47751" d="M156.833,97.333"/>
                <path fill="#F47751" d="M117.75,97"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88,8.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M98.333,18"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M98.333,18"/>
                <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="501.5" y1="54.5" x2="501.5" y2="60"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M114,4.5"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M84.333,12"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88,8.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M91.25,11.917"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88,8.667"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M84.333,11.917"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M91.25,11.917"/>
                <polygon stroke="#000000" stroke-miterlimit="10" points="84.946,9.135 88,3.845 91.054,9.135 "/>
                <polygon stroke="#000000" stroke-miterlimit="10" points="177.477,100.296 177.345,94.235 182.74,97.196 "/>
                <polygon fill="none" points="182.74,117.719 186.5,124.5 172.5,104.5 197.5,104.5 "/>
                <text transform="matrix(1 0 0 1 178.7148 113.3828)" font-family="'MyanmarText'" font-size="12">I</text>
                <circle fill="#F47751" cx="110.375" cy="116.917" r="3.083"/>
                <circle fill="#F47751" cx="96.5" cy="103.771" r="3.083"/>
                <path fill="#F47751" d="M110.375,87.083"/>
                <circle fill="#F47751" cx="110.375" cy="103.771" r="3.083"/>
                <circle fill="#F47751" cx="96.5" cy="116.855" r="3.083"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M83,109.5"/>
                <path fill="none" d="M38,4.833"/>
                <circle fill="#F47751" cx="81.875" cy="117.083" r="3.083"/>
                <circle fill="#F47751" cx="68" cy="103.938" r="3.083"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M74.125,111.833"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88,111.833"/>
                <circle fill="#F47751" cx="81.875" cy="103.938" r="3.083"/>
                <circle fill="#F47751" cx="68" cy="117.021" r="3.083"/>
                <circle fill="#F47751" cx="110.375" cy="91.167" r="3.083"/>
                <circle fill="#F47751" cx="96.5" cy="78.021" r="3.083"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M102.625,85.917"/>
                <circle fill="#F47751" cx="110.375" cy="78.021" r="3.083"/>
                <circle fill="#F47751" cx="96.5" cy="91.105" r="3.083"/>
                <path fill="none" d="M100.5,75"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M83.125,83.688"/>
                <circle fill="#F47751" cx="82" cy="91.105" r="3.083"/>
                <circle fill="#F47751" cx="68.125" cy="78.021" r="3.083"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M74.25,86.021"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M88.125,85.521"/>
                <circle fill="#F47751" cx="82" cy="78.126" r="3.083"/>
                <circle fill="#F47751" cx="68.125" cy="91.105" r="3.083"/>
                <path fill="none" d="M-17.75,52.543"/>
                <path fill="none" d="M72.125,75.105"/>
                <path fill="none" d="M146.5,126.25"/>
                <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="4.667" y1="97" x2="177.333" y2="97"/>
                <line fill="none" x1="123" y1="4.5" x2="195" y2="4.5"/>
                <path fill="none" d="M120.5,100.583"/>
                <path fill="none" d="M195,104.5"/>
                <path fill="#F47751" d="M137.375,87.083"/>
                <circle fill="#F47751" cx="137.375" cy="91.167" r="3.083"/>
                <circle fill="#F47751" cx="123.5" cy="78.021" r="3.083"/>
                <circle fill="#F47751" cx="137.375" cy="78.021" r="3.083"/>
                <circle fill="#F47751" cx="123.5" cy="91.105" r="3.083"/>
                <path fill="none" d="M127.5,75"/>
                <path fill="none" d="M96.063-20.479"/>
                <path fill="none" d="M93.563,75.605"/>
                <path fill="#F47751" d="M110.438,62.105"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M111.563,58.605"/>
                <circle fill="#F47751" cx="110.438" cy="66.188" r="3.083"/>
                <circle fill="#F47751" cx="96.563" cy="53.043" r="3.083"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M102.688,60.938"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M116.563,60.938"/>
                <circle fill="#F47751" cx="110.438" cy="53.042" r="3.083"/>
                <circle fill="#F47751" cx="96.563" cy="66.126" r="3.083"/>
                <path fill="none" d="M100.563,50.021"/>
                <path fill="none" d="M123.063-20.479"/>
                <path fill="none" d="M120.563,75.604"/>
                <path fill="#F47751" d="M137.438,62.104"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M138.563,58.604"/>
                <circle fill="#F47751" cx="137.438" cy="66.188" r="3.083"/>
                <circle fill="#F47751" cx="123.563" cy="53.042" r="3.083"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M129.688,60.938"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M143.563,60.938"/>
                <circle fill="#F47751" cx="137.438" cy="53.042" r="3.083"/>
                <circle fill="#F47751" cx="123.563" cy="66.126" r="3.083"/>
                <path fill="none" d="M127.563,50.021"/>
                <path fill="#F47751" d="M95.073,91.167"/>
                <path fill="none" d="M112.406,104.5"/>
                <path fill="none" d="M112.406,4.5"/>
                <path fill="#F47751" d="M54.781,87.083"/>
                <circle fill="#F47751" cx="54.781" cy="91.167" r="3.083"/>
                <circle fill="#F47751" cx="40.906" cy="78.021" r="3.083"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M60.906,85.917"/>
                <circle fill="#F47751" cx="54.781" cy="78.021" r="3.083"/>
                <circle fill="#F47751" cx="40.906" cy="91.105" r="3.083"/>
                <path fill="none" d="M44.906,75"/>
                <path fill="none" d="M9.531,74.938"/>
                <path fill="none" d="M67.406,4.5"/>
                <path fill="none" d="M64.906,100.583"/>
                <path fill="#F47751" d="M81.781,87.083"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M82.906,83.583"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M74.031,85.917"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M87.906,85.917"/>
                <path fill="#F47751" d="M67.906,94.188c-1.703,0-3.083-1.38-3.083-3.083s1.38-3.083,3.083-3.083"/>
                <path fill="none" d="M71.906,75"/>
                <path fill="none" d="M68.698,100.208"/>
                <path fill="#F47751" d="M54.844,62.104"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M55.969,58.604"/>
                <circle fill="#F47751" cx="54.844" cy="66.188" r="3.083"/>
                <circle fill="#F47751" cx="40.969" cy="53.042" r="3.083"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M60.969,60.938"/>
                <circle fill="#F47751" cx="54.844" cy="53.042" r="3.083"/>
                <circle fill="#F47751" cx="40.969" cy="66.126" r="3.083"/>
                <path fill="none" d="M44.969,50.021"/>
                <path fill="none" d="M9.594,49.959"/>
                <path fill="none" d="M45.594,49.459"/>
                <path fill="none" d="M22.51,61.813"/>
                <path fill="none" d="M41.76,75.229"/>
                <path fill="none" d="M41.76,58.979"/>
                <path fill="none" d="M22.51,58.979"/>
                <path fill="none" d="M67.469-20.479"/>
                <path fill="none" d="M64.969,75.604"/>
                <path fill="#F47751" d="M81.844,62.104"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M82.969,58.604"/>
                <circle fill="#F47751" cx="81.844" cy="66.188" r="3.083"/>
                <circle fill="#F47751" cx="67.969" cy="53.042" r="3.083"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M74.094,60.938"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M87.969,60.938"/>
                <circle fill="#F47751" cx="81.844" cy="53.042" r="3.083"/>
                <circle fill="#F47751" cx="67.969" cy="66.126" r="3.083"/>
                <path fill="none" d="M71.969,50.021"/>
                <circle fill="#F47751" cx="137.542" cy="141.719" r="3.083"/>
                <circle fill="#F47751" cx="123.667" cy="128.636" r="3.083"/>
                <circle fill="#F47751" cx="137.542" cy="128.74" r="3.083"/>
                <circle fill="#F47751" cx="123.667" cy="141.719" r="3.083"/>
                <path fill="none" d="M37.792,103.157"/>
                <path fill="none" d="M127.667,125.719"/>
                <path fill="none" d="M121.792,2.824"/>
                <path fill="none" d="M147.667,125.552"/>
                <path fill="none" d="M95.948,55.114"/>
                <path fill="#F47751" d="M110.323,137.698"/>
                <circle fill="#F47751" cx="110.323" cy="141.781" r="3.083"/>
                <circle fill="#F47751" cx="96.448" cy="128.636" r="3.083"/>
                <circle fill="#F47751" cx="110.323" cy="128.636" r="3.083"/>
                <circle fill="#F47751" cx="96.448" cy="141.719" r="3.083"/>
                <path fill="none" d="M100.448,125.614"/>
                <path fill="#F47751" d="M137.323,137.698"/>
                <circle fill="#F47751" cx="137.323" cy="141.781" r="3.083"/>
                <circle fill="#F47751" cx="123.448" cy="128.636" r="3.083"/>
                <circle fill="#F47751" cx="137.323" cy="128.636" r="3.083"/>
                <circle fill="#F47751" cx="123.448" cy="141.719" r="3.083"/>
                <path fill="none" d="M127.448,125.614"/>
                <path fill="none" d="M66.198,2.823"/>
                <path fill="none" d="M92.073,125.552"/>
                <path fill="none" d="M128.073,125.052"/>
                <path fill="none" d="M127.182,19.75"/>
                <path fill="none" d="M93.51,126.219"/>
                <path fill="#F47751" d="M110.385,112.719"/>
                <path fill="#F47751" d="M113.469,116.802c0,1.703-1.38,3.083-3.083,3.083s-3.083-1.38-3.083-3.083"/>
                <path fill="#F47751" d="M110.385,106.74c-1.703,0-3.083-1.38-3.083-3.083c0-1.703,1.38-3.083,3.083-3.083s3.083,1.38,3.083,3.083"/>
                <path fill="none" d="M100.51,100.636"/>
                <path fill="#F47751" d="M137.385,112.719"/>
                <circle fill="#F47751" cx="137.385" cy="116.802" r="3.083"/>
                <circle fill="#F47751" cx="123.51" cy="103.657" r="3.083"/>
                <circle fill="#F47751" cx="137.385" cy="103.657" r="3.083"/>
                <circle fill="#F47751" cx="123.51" cy="116.74" r="3.083"/>
                <path fill="none" d="M127.51,100.635"/>
                <path fill="none" d="M97.432-32.541"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M83.167,134.302"/>
                <circle fill="#F47751" cx="82.042" cy="141.719" r="3.083"/>
                <circle fill="#F47751" cx="68.167" cy="128.636" r="3.083"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M74.292,136.636"/>
                <circle fill="#F47751" cx="82.042" cy="128.74" r="3.083"/>
                <circle fill="#F47751" cx="68.167" cy="141.719" r="3.083"/>
                <path fill="none" d="M97.464-7.562"/>
                <path fill="none" d="M123.339,115.166"/>
                <path fill="none" d="M97.396,96.177"/>
                <path fill="none" d="M78.146,96.177"/>
                <path fill="none" d="M40.448,55.114"/>
                <path fill="none" d="M37.948,151.198"/>
                <path fill="#F47751" d="M54.823,137.698"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M55.948,134.198"/>
                <circle fill="#F47751" cx="54.823" cy="141.781" r="3.083"/>
                <circle fill="#F47751" cx="40.948" cy="128.636" r="3.083"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M47.073,136.531"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M60.948,136.531"/>
                <circle fill="#F47751" cx="54.823" cy="128.636" r="3.083"/>
                <circle fill="#F47751" cx="40.948" cy="141.719" r="3.083"/>
                <path fill="none" d="M44.948,125.614"/>
                <path fill="#F47751" d="M81.823,137.698"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M82.948,134.198"/>
                <circle fill="#F47751" cx="81.823" cy="141.781" r="3.083"/>
                <circle fill="#F47751" cx="67.948" cy="128.636" r="3.083"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M74.073,136.531"/>
                <circle fill="#F47751" cx="81.823" cy="128.636" r="3.083"/>
                <circle fill="#F47751" cx="67.948" cy="141.719" r="3.083"/>
                <path fill="none" d="M71.948,125.614"/>
                <path fill="none" d="M10.698,2.824"/>
                <path fill="#F47751" d="M54.885,112.719"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M56.01,109.219"/>
                <circle fill="#F47751" cx="54.885" cy="116.802" r="3.083"/>
                <circle fill="#F47751" cx="41.01" cy="103.657" r="3.083"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M47.135,111.552"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M61.01,111.552"/>
                <circle fill="#F47751" cx="54.885" cy="103.657" r="3.083"/>
                <circle fill="#F47751" cx="41.01" cy="116.74" r="3.083"/>
                <path fill="none" d="M45.01,100.636"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M83.01,109.219"/>
                <circle fill="#F47751" cx="68.01" cy="103.657" r="3.083"/>
                <path fill="none" stroke="#000000" stroke-miterlimit="10" d="M74.135,111.552"/>
                <path fill="none" d="M72.01,100.636"/>
                <path fill="none" d="M10.76-22.155"/>
                <path fill="none" d="M36.635,100.573"/>
                <path fill="none" d="M68.802,125.844"/>
                <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="87.771" y1="8.667" x2="87.771" y2="184.667"/>
                <rect x="96" y="4.5" fill="none" width="72" height="32.25"/>
                <text transform="matrix(1 0 0 1 96 13.3828)" font-family="'MyanmarText'" font-size="12">Q</text>
            </svg>
            <div class="cauption">{{modulation}} constellation</div>
        </div>
    `,
    styles: [`
    div{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    svg{
        width: 200px;
        margin-left: 20px;
    }
    .cauption{
        font-style: italic;
        color: #595959;
        font-size: 14px;
    }
    `]
})
export class ConstllationsComponent {
    @Input() modulation: Modulation.ModulationType;
    constructor() { }

}
