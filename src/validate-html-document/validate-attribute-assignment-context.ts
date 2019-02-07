import { isAssignableToPrimitiveType, isAssignableToSimpleTypeKind, isAssignableToType, isAssignableToValue, isSimpleType, SimpleTypeKind, simpleTypeToString } from "ts-simple-type";
import { Node, TypeChecker } from "typescript";
import { ITsHtmlExtensionValidateExpressionContext } from "../extensions/i-ts-html-extension";
import { HtmlAttrAssignmentType } from "../html-document/types/html-attr-assignment-types";
import { TsHtmlPluginStore } from "../state/store";

/**
 * Takes a type and returns a user friendly string that can be used in the UI.
 * @param type
 * @param checker
 */
function getTypeString(type: HtmlAttrAssignmentType, checker: TypeChecker): string {
	if (isSimpleType(type)) {
		return simpleTypeToString(type);
	}

	// Use the typescript checker to return a string for a type
	return checker.typeToString(type);
}

/**
 * Returns a context object with helpers that can be used in type validator functions.
 * @param astNode
 * @param checker
 * @param store
 */
export function makeValidateAttributeAssignmentContext(astNode: Node, checker: TypeChecker, store: TsHtmlPluginStore): ITsHtmlExtensionValidateExpressionContext {
	return {
		file: astNode.getSourceFile(),
		store,
		checker,
		getTypeString: (type: HtmlAttrAssignmentType) => getTypeString(type, checker),
		isAssignableToPrimitive: (type: HtmlAttrAssignmentType) => isAssignableToPrimitiveType(type, checker),
		isAssignableTo: (typeA: HtmlAttrAssignmentType, typeB: HtmlAttrAssignmentType) => isAssignableToType(typeA, typeB, checker),
		isAssignableToValue: (type: HtmlAttrAssignmentType, value: string) => isAssignableToValue(type, value, checker),
		isAssignableToSimpleTypeKind: (type: HtmlAttrAssignmentType, kind: SimpleTypeKind) => isAssignableToSimpleTypeKind(type, kind, checker)
	};
}