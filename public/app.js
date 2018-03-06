new Ractive({
	el: document.body,
	template: `
		<p>
			<label>Heading</label>
			<input value="{{modalHeading}}">
		</p>
		<p>
			<label>Text</label>
			<input value="{{modalText}}">
        </p>
        <p>
            <label>Button Text</label>
            <input value="{{textOpen}}">
            <label>Close Text</label>
            <input value="{{textClose}}">
        </p>
		<p>
			<label>Overlay</label>
			<input checked="{{overlay}}" type="checkbox">
		</p>
		<div id="modal">
            {{! <button id="modal-open" on-click="modal:open">Custom open</button> }}
			<div id="modal-content">
				<h1>{{modalHeading}}</h1>
				<p>{{modalText}}</p>
			</div>
			{{! <button id="modal-close" class="morph-button" on-click="modal:close">Custom close</button> }}
		</div>
	`,
	data: {
		modalHeading: 'Hello from Ractive!',
        modalText: 'Some text',
        textOpen: 'Open',
        textClose: 'Close',
		overlay: true,
	},
	onrender() {
		const modal = new MorphingModal({
			target: document.getElementById('modal'),
			slots: {
                content: document.getElementById('modal-content'),
				//open: document.getElementById('modal-open'),
				//close: document.getElementById('modal-close')
            },
            data: {
                overlay: this.get('overlay'),
                textOpen: this.get('textOpen'),
                textClose: this.get('textClose'),
                classOpen: '',
                classClose: ''
            }
		});

		modal.on('beforeopen', () => console.log('beforeopen'));
		modal.on('beforeclose', () => console.log('beforeclose'));
		modal.on('afteropen', () => console.log('afteropen'));
		modal.on('afterclose', () => console.log('afterclose'));

		this.observe('overlay textOpen textClose', (val, old, keypath) => modal.set({ [keypath]: val }));
		this.on('modal:close modal:open', () => modal.toggle());
	}
});