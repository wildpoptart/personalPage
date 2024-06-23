class CarGallery extends HTMLElement{
	constructor(){
		super();

		this.classList.add('galleryClass');

		this.innerHTML = `
			<div class="grid">
				<a href="https://www.stanborsh.xyz/img/yellow_integra.JPG" 		target="_blank"><img src="../img/lowres_yellow_integra.jpg" alt="yellow Integra"></a>
				<a href="https://www.stanborsh.xyz/img/yellow_integra.JPG" 		target="_blank"><img src="../img/lowres_yellow_integra.jpg" alt="yellow Integra"></a>
				<a href="https://www.stanborsh.xyz/img/yellow_integra.JPG" 		target="_blank"><img src="../img/lowres_yellow_integra.jpg" alt="yellow Integra"></a>
				<a href="https://www.stanborsh.xyz/img/yellow_integra.JPG" 		target="_blank"><img src="../img/lowres_yellow_integra.jpg" alt="yellow Integra"></a>
				<a href="https://www.stanborsh.xyz/img/yellow_integra.JPG" 		target="_blank"><img src="../img/lowres_yellow_integra.jpg" alt="yellow Integra"></a>
				<a href="https://www.stanborsh.xyz/img/yellow_integra.JPG" 		target="_blank"><img src="../img/lowres_yellow_integra.jpg" alt="yellow Integra"></a>
				<a href="https://www.stanborsh.xyz/img/yellow_integra.JPG" 		target="_blank"><img src="../img/lowres_yellow_integra.jpg" alt="yellow Integra"></a>
				<a href="https://www.stanborsh.xyz/img/yellow_integra.JPG" 		target="_blank"><img src="../img/lowres_yellow_integra.jpg" alt="yellow Integra"></a>
				<a href="https://www.stanborsh.xyz/img/yellow_integra.JPG" 		target="_blank"><img src="../img/lowres_yellow_integra.jpg" alt="yellow Integra"></a>
			</div>
		`;
	}
}

customElements.define('car-gallery', CarGallery);