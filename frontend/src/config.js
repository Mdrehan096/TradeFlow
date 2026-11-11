const DASHBOARD_URL = (
  process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001"
)
  .trim()
  .replace(/\/+$/, "");

export { DASHBOARD_URL };
export default DASHBOARD_URL;

