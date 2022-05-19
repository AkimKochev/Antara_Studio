class Detection {
	isMobile() {
		if (!this.isMobileCheck) {
			this.isMobileCheck = true;

			this.checkMobile = document.documentElement.classList.contains('mobile');
		}

		return this.isMobileCheck;
	}
	isTablet() {
		if (!this.isTabletCheck) {
			this.isTabletCheck = true;

			this.checkTablet = document.documentElement.classList.contains('tablet');
		}

		return this.isTabletCheck;
	}
	isDesktop() {
		if (!this.isDesktopCheck) {
			this.isDesktopCheck = true;

			this.checkDesktop = document.documentElement.classList.contains('desktop');
		}

		return this.isDesktopCheck;
	}
}

export default DetectionManager = new Detection();
