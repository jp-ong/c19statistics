const GlobalData = ({ data }) => {
  return (
    <div>
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
    <div>
      <div>
        <h2>{value?.toLocaleString()}</h2>
      </div>
      <div>{header}</div>
    </div>
  );
};

export default GlobalData;
