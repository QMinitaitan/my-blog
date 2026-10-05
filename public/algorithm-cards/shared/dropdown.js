/** Keep a native value/event source, with a themed popup and keyboard navigation. */
export function mountDropdown(select, signal) {
	const inlineMenu = select.id === "example-select";
	select.hidden = true;
	const wrapper = document.createElement("div");
	wrapper.className = "card-dropdown";
	select.before(wrapper);
	wrapper.append(select);
	const trigger = document.createElement("button");
	trigger.type = "button";
	trigger.className = "dropdown-trigger";
	trigger.setAttribute("role", "combobox");
	trigger.setAttribute("aria-label", select.getAttribute("aria-label"));
	trigger.setAttribute("aria-haspopup", "listbox");
	trigger.setAttribute("aria-expanded", "false");
	const menu = document.createElement("div");
	menu.className = "dropdown-menu";
	menu.id = `${select.id}-menu`;
	if (inlineMenu) menu.hidden = true;
	else menu.setAttribute("popover", "manual");
	menu.setAttribute("role", "listbox");
	menu.setAttribute("aria-label", select.getAttribute("aria-label"));
	trigger.setAttribute("aria-controls", menu.id);
	wrapper.append(trigger, menu);
	const listen = (element, event, handler) =>
		element.addEventListener(event, handler, { signal });
	const options = [...select.options].map((option) => {
		const button = document.createElement("button");
		button.type = "button";
		button.setAttribute("role", "option");
		button.tabIndex = -1;
		button.textContent = option.textContent;
		menu.append(button);
		listen(button, "click", () => {
			select.value = option.value;
			update();
			close();
			trigger.focus();
			select.dispatchEvent(new Event("change", { bubbles: true }));
		});
		return button;
	});
	function update() {
		trigger.textContent = select.selectedOptions[0]?.textContent || "";
		options.forEach((option, i) =>
			option.setAttribute("aria-selected", String(i === select.selectedIndex)),
		);
	}
	const isOpen = () =>
		inlineMenu ? !menu.hidden : menu.matches(":popover-open");
	function close() {
		if (inlineMenu) menu.hidden = true;
		else if (isOpen()) menu.hidePopover();
		trigger.setAttribute("aria-expanded", "false");
	}
	function open() {
		if (inlineMenu) {
			menu.hidden = false;
			trigger.setAttribute("aria-expanded", "true");
			options[select.selectedIndex]?.focus({ preventScroll: true });
			return;
		}
		menu.showPopover();
		trigger.setAttribute("aria-expanded", "true");
		const rect = trigger.getBoundingClientRect();
		const width = Math.min(Math.max(rect.width, 180), window.innerWidth - 24);
		menu.style.width = `${width}px`;
		const below = window.innerHeight - rect.bottom - 16;
		const above = rect.top - 16;
		const up = below < 200 && above > below;
		menu.style.maxHeight = `${Math.min(320, Math.max(90, up ? above : below))}px`;
		menu.style.left = `${Math.min(Math.max(12, rect.left), window.innerWidth - width - 12)}px`;
		menu.style.top = `${up ? Math.max(12, rect.top - menu.offsetHeight - 6) : rect.bottom + 6}px`;
		options[select.selectedIndex]?.focus();
	}
	listen(trigger, "click", () => (isOpen() ? close() : open()));
	listen(wrapper, "keydown", (event) => {
		if (event.key === "Escape") {
			event.preventDefault();
			event.stopPropagation();
			close();
			trigger.focus();
			return;
		}
		if (event.key === "Tab") {
			close();
			return;
		}
		if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
		event.preventDefault();
		if (!isOpen()) open();
		else {
			const active = options.indexOf(menu.getRootNode().activeElement);
			const index =
				event.key === "Home"
					? 0
					: event.key === "End"
						? options.length - 1
						: (active + (event.key === "ArrowDown" ? 1 : -1) + options.length) %
							options.length;
			options[index].focus();
		}
	});
	listen(document, "pointerdown", (event) => {
		if (!event.composedPath().includes(wrapper)) close();
	});
	listen(document, "scroll", (event) => {
		if (!inlineMenu && !event.composedPath().includes(menu)) close();
	});
	listen(window, "resize", close);
	listen(select, "change", update);
	signal.addEventListener("abort", close, { once: true });
	update();
	return { close };
}
