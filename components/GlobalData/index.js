import styles from "styles/modules/GlobalData.module.scss";

const GlobalData = ({ data }) => {
  return (
    <div className={styles.grid}>
      <GridCard header="Total Confirmed" value={data.confirmed} />
      <GridCard header="Total Deaths" value={data.deaths} />
      <GridCard header="Total Recovered" value={data.recovered} />
      <GridCard header="Daily Confirmed" value={data.confirmed_daily} />
      <GridCard header="Daily Deaths" value={data.deaths_daily} />
      <GridCard header="Daily Recovered" value={data.recovered_daily} />
    </div>
  );
};

const GridCard = ({ header, value }) => {
  return (
    <div className={styles.card}>
      <div className={styles.value}>
        <h2>{value?.toLocaleString()}</h2>
      </div>
      <div className={styles.header}>{header}</div>
    </div>
  );
};

export default GlobalData;
