export default function AgentBasicInformationData({ basicInformation }) {
  return (
    <div className="data">
      <div>Company name: {basicInformation.name}</div>
      <div>Company form: {basicInformation.legalForm}</div>
      <div>Legal status: {basicInformation.legalStatus}</div>
      <div>Registration date: {basicInformation.registrationDate}</div>
      <div>Business ID: {basicInformation.nationalIdentifier}</div>
      <div>Address: {basicInformation.registeredAddress.fullAddress}</div>
      <div>Post code: {basicInformation.registeredAddress.postCode}</div>
      <div>Post name: {basicInformation.registeredAddress.postName}</div>
    </div>
  )
}
