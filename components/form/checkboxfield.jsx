export default function CheckboxField({ label, href = "/" }) { // Set default href
    return (
      <div className="pt-5">
        <input type="checkbox" id="agreement" required />
        <label htmlFor="agreement" className="text-m font-normal text-textcolor">
          {label} <a href={href} className="text-primary">Syarat dan Ketentuan</a>
        </label>
      </div>
    );
  }
  