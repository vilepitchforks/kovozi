import { Logout, Privacy } from "../../components/UtilityLinks/UtilityLinks";

import Layout from "../../components/Demo/Layout/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div className="md:hidden">
        <Privacy />
      </div>
      <div>
        <Logout />
      </div>
    </Layout>
  );
};

Dashboard.skipLayout = true;

export default Dashboard;
