// module.exports.aJsonModel = aJsonModel;
export { aJsonModel };

// we can construct objects multiple ways, two of which are shown below

// function return
function aJsonModel(model = <any>{}) {
	return {
		key1: model.key1 || "value 1",
		"key 2": model["key 2"] || "value 2"
	};
}

// newable classes
class AJsonModel {
	key1: string;
	"key 2": string;

	constructor(model = <any>{}) {
		this.key1 = model.key1 || "value 1";
		this["key 2"] = model["key 2"] || "value 2";
	}
}

// a "gotcha" for class though is that it can be added to exports only after the implementation
// module.exports.AJsonModel = AJsonModel;
export { AJsonModel };
