export default interface IMap{
    name:       string,
    jsonFile:   string,
    tileSets:   Array<{"name":string, "source": string}>,
    layers:     Array<{"name": string}>,
}