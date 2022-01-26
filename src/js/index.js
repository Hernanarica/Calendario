let monthNames = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];

let currentDate = new Date();
let currentDay  = currentDate.getDate();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let dates        = document.querySelector('.calendar__body-calendar-days');
let month        = document.querySelector('.calendar__header-date-month');
let year         = document.querySelector('.calendar__header-date-year');
let currentMonth = currentDate.getMonth();

let prevMonthDOM = document.querySelector('.btn-prev');
let nextMonthDOM = document.querySelector('.btn-next');

month.textContent                                      = monthNames[monthNumber];
document.querySelector('.calendar__month').textContent = monthNames[monthNumber];
year.textContent                                       = currentYear.toString();

prevMonthDOM.addEventListener('click', () => lastMonth());
nextMonthDOM.addEventListener('click', () => nextMonth());


const writeMonth = (month) => {
	for (let i = startDay(); i > 0; i--) {
		dates.innerHTML += ` <div class="calendar__body-day calendar__body-lastday">
            ${ getTotalDays(monthNumber - 1) - (i - 1) }
        </div>`;
	}
	
	for (let i = 1; i <= getTotalDays(month); i++) {
		if (i === currentDay && currentMonth === month) {
			dates.innerHTML += ` <div class="calendar__body-day calendar__body-day--active">${ i }</div>`;
			document.querySelector('.calendar__header-title').textContent = i;
		} else {
			dates.innerHTML += ` <div class="calendar__body-day">${ i }</div>`;
		}
	}
};

const getTotalDays = month => {
	if (month === -1) month = 11;
	
	if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
		return 31;
		
	} else if (month == 3 || month == 5 || month == 8 || month == 10) {
		return 30;
		
	} else {
		
		return isLeap() ? 29 : 28;
	}
};

const isLeap = () => {
	return ((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
};

const startDay = () => {
	let start = new Date(currentYear, monthNumber, 1);
	return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
};

const lastMonth = () => {
	if (monthNumber !== 0) {
		monthNumber--;
	} else {
		monthNumber = 11;
		currentYear--;
	}
	
	setNewDate();
};

const nextMonth = () => {
	if (monthNumber !== 11) {
		monthNumber++;
	} else {
		monthNumber = 0;
		currentYear++;
	}
	
	setNewDate();
};

const setNewDate = () => {
	currentDate.setFullYear(currentYear, monthNumber, currentDay);
	month.textContent                                           = monthNames[monthNumber];
	document.querySelector('.calendar__month').textContent      = monthNames[monthNumber];
	year.textContent                                            = currentYear.toString();
	document.querySelector('.calendar__body-title').textContent = currentYear.toString();
	dates.textContent                                           = '';
	writeMonth(monthNumber);
};

writeMonth(monthNumber);