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
		feedback: "",
		maxPrice: 0,
		error: "Cannot be empty!, please add a garment",
		success: "Garment successfully added",
		delete: "Garment delete success",
		item: {
			description: "",
			img: "",
			season: "",
			gender: "",
			price: 0,
		},
		addBtn() {
			return (this.isOpen = true);
		},
		hideAddBtn() {
			return (this.isOpen = !this.isOpen);
		},
		filterGarments() {
			try {
				fetch(
					`/api/garments?gender=${this.filterGender}&season=${this.filterSeason}`
				)
					.then(filtered => filtered.json())
					.then(result => {
						this.garments = result.data;
					})
					.catch(error => new Error(error.message));
			} catch {
				this.error(error.message);
			}
		},
		filterByPrice() {
			try {
				fetch(`/api/garments/${this.maxPrice}`)
					.then((price) => price.json())
					.then((data) => {
						(this.garments = data.data);
					})
					.catch((error) => new Error(error.message));
			} catch {
				this.error(error.message);
			}
		},
		addGarment() {
			try {
				const items = this.item;
				if (
					items.description == "" ||
					items.img == "" ||
					items.season == "" ||
					items.gender == "" ||
					items.price == 0
				) {
					this.feedback = this.error;
				} else {
					axios.post("/api/garments", items)
					.then((data) => {
						(this.garments = data.data);
					})
					this.feedback = this.success;
				}
			} catch (error) {
				console.log(error);
			}
		},
	}));
});
