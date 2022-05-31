document.addEventListener("alpine:init", () => {
	Alpine.data("garments", () => ({
			init() {
				fetch("/api/garments")
					.then((r) => r.json())
					.then((data) => (this.garments = data.data));
			},
			garments: [],
			filterGender: "",
			filterSeason: "",
			isOpen: false,
			item: ({
                description: '',
                img: '',
                season: '',
                gender: '',
                price: 0.00,
            }),
			addBtn() {
				return (this.isOpen = true);
			},
			hideAddBtn() {
				return (this.isOpen = ! this.isOpen);
			},
			filterGarments() {
				try {
					fetch(
						`/api/garments?gender=${this.filterGender}&season=${this.filterSeason}`
					)
						.then((filtered) => filtered.json())
						.then((result) => {
							this.garments = result.data;
						})
						.catch((error) => new Error(error.message));
				} catch {
					this.error(error.message);
				}
			},
			addGarment() {
				try {
					const items = this.item;
					axios
						.post("/api/garments", items)
						.then(() => this.items)
						.catch((error) => new Error(error.message));
				} catch {
					this.error(error.message);
				}
			},
	}));
});
