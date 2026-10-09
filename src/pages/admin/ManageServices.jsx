import { useEffect, useState } from "react";
import API from "../../services/api";

const emptyForm = { name: "", description: "", price: "", duration: "", image: "" };

function validateForm(form) {
	const errors = {};
	if (!form.name.trim()) errors.name = "Enter a service name.";
	if (!form.description.trim()) errors.description = "Enter a service description.";
	if (!form.duration.trim()) errors.duration = "Enter the expected duration.";
	if (!form.price.trim()) {
		errors.price = "Enter a price.";
	} else if (!Number.isFinite(Number(form.price)) || Number(form.price) <= 0) {
		errors.price = "Price must be a number greater than zero.";
	}
	if (form.image.trim() && !/^https?:\/\/|^\//i.test(form.image.trim())) {
		errors.image = "Image must be a full URL or a path beginning with /.";
	}
	return errors;
}

export default function ManageServices() {
	const [services, setServices] = useState([]);
	const [form, setForm] = useState(emptyForm);
	const [errors, setErrors] = useState({});
	const [requestError, setRequestError] = useState("");
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const loadServices = async () => {
		setLoading(true);
		try {
			const { data } = await API.get("/admin/services");
			setServices(data);
		} catch (error) {
			setRequestError(error.response?.data?.message || "Unable to load services.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => { loadServices(); }, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm((current) => ({ ...current, [name]: value }));
		setErrors((current) => ({ ...current, [name]: "" }));
		setRequestError("");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const nextErrors = validateForm(form);
		setErrors(nextErrors);
		setRequestError("");
		if (Object.keys(nextErrors).length) return;

		setSaving(true);
		try {
			await API.post("/services", {
				name: form.name.trim(),
				description: form.description.trim(),
				price: Number(form.price),
				duration: form.duration.trim(),
				image: form.image.trim()
			});
			setForm(emptyForm);
			setErrors({});
			await loadServices();
		} catch (error) {
			setRequestError(error.response?.data?.message || "Unable to save this service. Please try again.");
		} finally {
			setSaving(false);
		}
	};

	return <div>
		<div className="admin-heading">
			<div><div className="eyebrow">CATALOGUE</div><h1>Manage services</h1><p>Keep your menu fresh and bookable.</p></div>
		</div>
		<section className="admin-panel service-form-panel">
			<div className="panel-heading"><h2>Add service</h2></div>
			<form className="service-form" onSubmit={handleSubmit} noValidate>
				<label>Service name<input name="name" value={form.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} />{errors.name && <span className="form-error">{errors.name}</span>}</label>
				<label>Description<textarea name="description" value={form.description} onChange={handleChange} rows="3" aria-invalid={Boolean(errors.description)} />{errors.description && <span className="form-error">{errors.description}</span>}</label>
				<div className="service-form-grid">
					<label>Price (₹)<input name="price" type="number" min="0.01" step="0.01" value={form.price} onChange={handleChange} aria-invalid={Boolean(errors.price)} />{errors.price && <span className="form-error">{errors.price}</span>}</label>
					<label>Duration<input name="duration" value={form.duration} onChange={handleChange} placeholder="45 minutes" aria-invalid={Boolean(errors.duration)} />{errors.duration && <span className="form-error">{errors.duration}</span>}</label>
				</div>
				<label>Image URL or path (optional)<input name="image" type="text" value={form.image} onChange={handleChange} placeholder="/images/service.jpg" aria-invalid={Boolean(errors.image)} />{errors.image && <span className="form-error">{errors.image}</span>}</label>
				{requestError && <p className="form-error">{requestError}</p>}
				<button className="button" type="submit" disabled={saving}>{saving ? "Saving..." : "Save service"}</button>
			</form>
		</section>
		<section className="admin-panel service-table">
			<div className="panel-heading"><h2>All services</h2><span className="muted">{services.length} total</span></div>
			{loading ? <p className="muted">Loading services...</p> : services.length ? services.map((service) => <div className="service-row" key={service._id}><img src={service.image || "/images/placeholder.jpg"} alt="" /><div><strong>{service.name}</strong><span>{service.duration || "Duration not set"}</span></div><b>₹{service.price}</b><span className={`status ${service.status ? "status--confirmed" : "status--pending"}`}>{service.status ? "Active" : "Archived"}</span><button className="icon-button" type="button" aria-label={`Actions for ${service.name}`}>•••</button></div>) : <p className="muted">No services have been added yet.</p>}
		</section>
	</div>;
}
