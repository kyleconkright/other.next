import { Fragment } from "react";
import withLayout from "../../../components/layouts";
import withAccountLayout from "../accountLayout";

function SettingsPage() {
  return (
    <div id="content">
      <h3>Settings</h3>
      <input name="phonenumber" placeholder="Phone Number" type="text" />
    </div>
  );
}

export default withLayout(withAccountLayout(SettingsPage));
;