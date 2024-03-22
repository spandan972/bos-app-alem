const {
  potId,
  env,
  hrefWithParams,
  potDetail: { base_currency, total_public_donations },
} = props;

const { ownerId, NADA_BOT_URL, SUPPORTED_FTS } = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  NADA_BOT_URL: "",
  SUPPORTED_FTS: {},
};

const { _address } = VM.require(`${ownerId}/widget/Components.DonorsUtils`) || {
  _address: (address) => address,
};

const { nearToUsdWithFallback, yoctosToUsdWithFallback } = VM.require(
  "potlock.near/widget/utils"
) || {
  nearToUsdWithFallback: () => "",
  yoctosToUsdWithFallback: () => "",
};

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  asyncGetDonationsForDonor: () => {},
  asyncGetApprovedApplications: () => {},
  getMatchingPoolDonations: () => {},
};
const RegistrySDK =
  VM.require("potlock.near/widget/SDK.registry") ||
  (() => ({
    asyncGetProjectById: () => {},
  }));

const registry = RegistrySDK({ env });

const [projectsId, setProjectsId] = useState(null);
const [projectsDonations, setProjectsDonations] = useState({});
const [usdToggle, setUsdToggle] = useState(false);

if (!projectsId) {
  PotSDK.asyncGetApprovedApplications(potId).then((projects) => {
    setProjectsId(projects);
  });
}

let sponsorshipDonations = PotSDK.getMatchingPoolDonations(potId);
if (sponsorshipDonations) sponsorshipDonations.sort((a, b) => b.net_amount - a.net_amount);

const lastProject = projectsId[projectsId.length - 1].project_id;

if (projectsId && !projectsDonations[lastProject]) {
  projectsId.forEach((project) =>
    PotSDK.asyncGetDonationsForProject(potId, project.project_id).then((projectDonations) => {
      if (!projects[project.project_id]) {
        setProjectsDonations((prev) => ({
          ...prev,
          [project.project_id]: {
            donations: projectDonations,
            config: project,
          },
        }));
      }
    })
  );
}

const calcUniqueDonors = (donations) => {
  // Get the count of unique donors
  const uniqueDonorIds = new Set();
  // Iterate through each object and collect unique donor_id values
  donations.forEach((project) => {
    project.donations.forEach((donation) => {
      uniqueDonorIds.add(donation.donor_id);
    });
  });
  // Get the number of unique donor_id values
  return uniqueDonorIds.size;
};

const calcMatchedAmount = (donations) => {
  const total = Big(0);
  donations.forEach((donation) => {
    total = total.plus(Big(donation.net_amount));
  });
  const amount = SUPPORTED_FTS[base_currency.toUpperCase()].fromIndivisible(total.toString());
  return amount;
};

const [projectsTotalDonations, numberOfUniqueDonorIds] = useMemo(() => {
  if (projectsDonations[lastProject]) {
    const projectsDonationsVals = Object.values(projectsDonations);

    // Sum the total matched donations for top 5 projects
    const totalProjectDonations = projectsDonationsVals.map((project) => ({
      amount: calcMatchedAmount(project.donations),
      id: project.config.project_id,
    }));

    totalProjectDonations.sort((a, b) => {
      return b.amount - a.amount;
    });

    // Get the number of unique donor_id values
    const numberOfUniqueDonorIds = calcUniqueDonors(projectsDonationsVals);

    return [totalProjectDonations.slice(0, 5), numberOfUniqueDonorIds];
  } else {
    return [[], "-"];
  }
}, [projectsDonations]);

const ProfileImg = ({ profile }) => (
  <Widget src="mob.near/widget/ProfileImage" props={{ profile, style: {} }} />
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 12px;
  border-top: 1px solid #292929;
  border-right: 1px solid #292929;
  border-bottom: 2px solid #292929;
  border-left: 1px solid #292929;
  overflow: hidden;
  .header {
    font-size: 18px;
    font-weight: 600;
    background: #fef6ee;
    padding: 1rem;
    span {
      color: #ee8949;
    }
  }
  .sort {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    font-weight: 500;
    letter-spacing: 0.44px;
    font-size: 11px;
    background: #fef6ee;
    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 1rem;
  gap: 8px;
  .address {
    display: flex;
    text-decoration: none;
    align-items: center;
    font-weight: 600;
    gap: 8px;
    margin-left: 24px;
    flex: 1;
    color: #292929;
    transition: color 200ms ease-in;
    :hover {
      color: #dd3345;
    }
  }
  .profile-image {
    width: 18px;
    height: 18px;
  }
`;

const TableRow = ({ donation: { id, donor_id, amount, net_amount }, idx }) => {
  id = donor_id || id;
  amount = amount || SUPPORTED_FTS[base_currency.toUpperCase()].fromIndivisible(net_amount);

  const profile = Social.getr(`${id}/profile`);
  const matchedAmout = usdToggle ? nearToUsdWithFallback(parseFloat(amount), true) : amount;
  return (
    <Row>
      <div>#{idx + 1}</div>
      <a className="address" href={hrefWithParams(`?tab=project&projectId=${id}`)}>
        <ProfileImg profile={profile} />
        {profile.name || id}
      </a>
      <div>
        {matchedAmout} {usdToggle ? " " : "N"}
      </div>
    </Row>
  );
};

const publicRoundStarted = projectsTotalDonations.length > 0;

const Table = ({ donations, totalAmount, totalUniqueDonors, title }) => (
  <Container>
    <div className="header">
      {totalAmount}
      <span>raised from</span>
      {totalUniqueDonors}
      <span>donors</span>
    </div>
    <div className="sort">
      <p>Top {title} </p>
      <div onClick={() => setUsdToggle(!usdToggle)}>
        <svg
          width="12"
          height="14"
          viewBox="0 0 12 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 10.7575V5.5H7.5V10.7575H5.25L8.25 13.75L11.25 10.7575H9ZM3.75 0.25L0.75 3.2425H3V8.5H4.5V3.2425H6.75L3.75 0.25ZM9 10.7575V5.5H7.5V10.7575H5.25L8.25 13.75L11.25 10.7575H9ZM3.75 0.25L0.75 3.2425H3V8.5H4.5V3.2425H6.75L3.75 0.25Z"
            fill="#7B7B7B"
          />
        </svg>
        {usdToggle ? "USD" : "NEAR"}
      </div>
    </div>
    {donations.map(({ id, donor_id, amount, net_amount }, idx) => {
      id = donor_id || id;
      amount = amount || SUPPORTED_FTS[base_currency.toUpperCase()].fromIndivisible(net_amount);

      const profile = Social.getr(`${id}/profile`);
      const matchedAmout = usdToggle ? nearToUsdWithFallback(parseFloat(amount), true) : amount;
      return (
        <Row>
          <div>#{idx + 1}</div>
          <a className="address" href={hrefWithParams(`?tab=project&projectId=${id}`)}>
            <ProfileImg profile={profile} />
            {_address(profile.name || id, 15)}
          </a>
          <div>
            {matchedAmout} {usdToggle ? " " : "N"}
          </div>
        </Row>
      );
    })}
  </Container>
);

return projectsTotalDonations.length > 0 ? (
  <Table
    title="matching pool allocations"
    totalAmount={yoctosToUsdWithFallback(total_public_donations, true)}
    totalUniqueDonors={numberOfUniqueDonorIds}
    donations={projectsTotalDonations}
  />
) : sponsorshipDonations.length > 0 ? (
  <Table
    title="sponsors"
    totalAmount={nearToUsdWithFallback(calcMatchedAmount(sponsorshipDonations))}
    totalUniqueDonors={new Set(sponsorshipDonations.map((obj) => obj.donor_id)).size}
    donations={sponsorshipDonations.slice(0, 5)}
  />
) : (
  ""
);
