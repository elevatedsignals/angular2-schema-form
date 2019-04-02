/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * General purpose propery binding registry
 */
var /**
 * General purpose propery binding registry
 */
PropertyBindingRegistry = /** @class */ (function () {
    function PropertyBindingRegistry() {
        this.bindings = {};
    }
    /**
     * @param {?} type
     * @return {?}
     */
    PropertyBindingRegistry.prototype.getPropertyBindings = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        this.bindings[type] = this.bindings[type] || new PropertyBindings();
        return this.bindings[type];
    };
    /**
     * @return {?}
     */
    PropertyBindingRegistry.prototype.getPropertyBindingsVisibility = /**
     * @return {?}
     */
    function () {
        return this.getPropertyBindings(PropertyBindingTypes.visibility);
    };
    return PropertyBindingRegistry;
}());
/**
 * General purpose propery binding registry
 */
export { PropertyBindingRegistry };
if (false) {
    /** @type {?} */
    PropertyBindingRegistry.prototype.bindings;
}
/** @enum {number} */
var PropertyBindingTypes = {
    visibility: 0,
};
export { PropertyBindingTypes };
PropertyBindingTypes[PropertyBindingTypes.visibility] = 'visibility';
/**
 * Storage that holds all bindings that are property paths related.<br/>
 */
var /**
 * Storage that holds all bindings that are property paths related.<br/>
 */
PropertyBindings = /** @class */ (function () {
    function PropertyBindings() {
        this.sourcesIndex = new SimplePropertyIndexer();
        this.dependenciesIndex = new SimplePropertyIndexer();
    }
    /**
     * @param {?} dependencyPath
     * @param {?} sourcePropertyPath
     * @return {?}
     */
    PropertyBindings.prototype.add = /**
     * @param {?} dependencyPath
     * @param {?} sourcePropertyPath
     * @return {?}
     */
    function (dependencyPath, sourcePropertyPath) {
        this.sourcesIndex.store(sourcePropertyPath, dependencyPath);
        this.dependenciesIndex.store(dependencyPath, sourcePropertyPath);
    };
    /**
     * @param {?} dependencyPath
     * @return {?}
     */
    PropertyBindings.prototype.findByDependencyPath = /**
     * @param {?} dependencyPath
     * @return {?}
     */
    function (dependencyPath) {
        var e_1, _a;
        /** @type {?} */
        var result = this.dependenciesIndex.find(dependencyPath);
        result.results = result.results || [];
        /** @type {?} */
        var values = [];
        try {
            for (var _b = tslib_1.__values(result.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                var res = _c.value;
                values = values.concat(Object.keys(res.value));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result.found ? values : [];
    };
    /**
     * @param {?} sourcePropertyPath
     * @return {?}
     */
    PropertyBindings.prototype.getBySourcePropertyPath = /**
     * @param {?} sourcePropertyPath
     * @return {?}
     */
    function (sourcePropertyPath) {
        var e_2, _a;
        /** @type {?} */
        var result = this.sourcesIndex.find(sourcePropertyPath);
        result.results = result.results || [];
        /** @type {?} */
        var values = [];
        try {
            for (var _b = tslib_1.__values(result.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                var res = _c.value;
                values = values.concat(Object.keys(res.value));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result.found ? values : [];
    };
    /**
     * @param {?} path
     * @return {?}
     */
    PropertyBindings.prototype.createPathIndex = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        return path.split('/');
    };
    return PropertyBindings;
}());
/**
 * Storage that holds all bindings that are property paths related.<br/>
 */
export { PropertyBindings };
if (false) {
    /** @type {?} */
    PropertyBindings.prototype.sourcesIndex;
    /** @type {?} */
    PropertyBindings.prototype.dependenciesIndex;
}
/**
 * Simple indexer to store property paths
 */
var SimplePropertyIndexer = /** @class */ (function () {
    function SimplePropertyIndexer() {
        this.index = {};
        this.findOnlyWithValue = true;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    SimplePropertyIndexer.prototype._createPathIndex = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        return path
            .replace(new RegExp('//', 'g'), '/')
            .replace(new RegExp('^/', 'g'), '')
            .split('/').filter(function (item) { return item; });
    };
    /**
     * @param {?} propertyPath
     * @param {?=} value
     * @return {?}
     */
    SimplePropertyIndexer.prototype.store = /**
     * @param {?} propertyPath
     * @param {?=} value
     * @return {?}
     */
    function (propertyPath, value) {
        this._storeIndex(this._createPathIndex(propertyPath), value);
    };
    /**
     * @param {?} pathIndex
     * @param {?=} value
     * @return {?}
     */
    SimplePropertyIndexer.prototype._storeIndex = /**
     * @param {?} pathIndex
     * @param {?=} value
     * @return {?}
     */
    function (pathIndex, value) {
        var e_3, _a;
        /** @type {?} */
        var indexPos = this.index;
        try {
            for (var pathIndex_1 = tslib_1.__values(pathIndex), pathIndex_1_1 = pathIndex_1.next(); !pathIndex_1_1.done; pathIndex_1_1 = pathIndex_1.next()) {
                var key = pathIndex_1_1.value;
                indexPos[key] = indexPos[key] || {};
                indexPos = indexPos[key];
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (pathIndex_1_1 && !pathIndex_1_1.done && (_a = pathIndex_1.return)) _a.call(pathIndex_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (indexPos && value) {
            indexPos[SimplePropertyIndexer.MARKER] = indexPos[SimplePropertyIndexer.MARKER] || {};
            indexPos[SimplePropertyIndexer.MARKER][value] = value;
        }
    };
    /**
     * Find path in index.<br/>
     * Will find path like:<br/>
     * <ul>
     *     <li>/property/0/prop</li>
     *     <li>/property/0/prop/2/test</li>
     *     <li>/property/0/prop/&#42;/test</li>
     *     <li>/property/&#42;/prop/1/test</li>
     *     <li>/property/&#42;/prop/&#42;/test</li>
     *     <li>/property/1/prop/&#42;/test</li>
     *  </ul>
     * @param path
     */
    /**
     * Find path in index.<br/>
     * Will find path like:<br/>
     * <ul>
     *     <li>/property/0/prop</li>
     *     <li>/property/0/prop/2/test</li>
     *     <li>/property/0/prop/&#42;/test</li>
     *     <li>/property/&#42;/prop/1/test</li>
     *     <li>/property/&#42;/prop/&#42;/test</li>
     *     <li>/property/1/prop/&#42;/test</li>
     *  </ul>
     * @param {?} path
     * @return {?}
     */
    SimplePropertyIndexer.prototype.find = /**
     * Find path in index.<br/>
     * Will find path like:<br/>
     * <ul>
     *     <li>/property/0/prop</li>
     *     <li>/property/0/prop/2/test</li>
     *     <li>/property/0/prop/&#42;/test</li>
     *     <li>/property/&#42;/prop/1/test</li>
     *     <li>/property/&#42;/prop/&#42;/test</li>
     *     <li>/property/1/prop/&#42;/test</li>
     *  </ul>
     * @param {?} path
     * @return {?}
     */
    function (path) {
        return this._findInIndex(this._createPathIndex(path));
    };
    /**
     * @param {?} path
     * @return {?}
     */
    SimplePropertyIndexer.prototype._findInIndex = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        /** @type {?} */
        var ixRes = { target: path, found: false, results: [] };
        this.__findIndex(ixRes, path, this.index, []);
        return ixRes;
    };
    /**
     * @param {?} indexerResults
     * @param {?} path
     * @param {?} index
     * @param {?=} parent
     * @return {?}
     */
    SimplePropertyIndexer.prototype.__findIndex = /**
     * @param {?} indexerResults
     * @param {?} path
     * @param {?} index
     * @param {?=} parent
     * @return {?}
     */
    function (indexerResults, path, index, parent) {
        var e_4, _a;
        /** @type {?} */
        var p = parent || [];
        /** @type {?} */
        var segment = path[0];
        /** @type {?} */
        var wild = ('*' === segment) ? Object.keys(index) : [];
        /** @type {?} */
        var _keys = ((/** @type {?} */ ((Array.isArray(segment) ? segment : [segment])))).concat(wild);
        /** @type {?} */
        var keys = _keys.filter(function (item, pos) { return '*' !== item && _keys.indexOf(item) === pos; });
        if (index['*']) {
            keys.push('*');
        }
        /** @type {?} */
        var paths = [];
        try {
            for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                /** @type {?} */
                var restPath = path.slice(1);
                /** @type {?} */
                var restIndex = index[key];
                /** @type {?} */
                var restParent = p.concat(key);
                if (path.length === 1) { // collect only the full paths
                    if (!this.findOnlyWithValue || (restIndex && restIndex[SimplePropertyIndexer.MARKER])) {
                        indexerResults.results = indexerResults.results || [];
                        indexerResults.results.push({
                            path: restParent,
                            value: restIndex[SimplePropertyIndexer.MARKER]
                        });
                        paths.push(restParent);
                        indexerResults.found = indexerResults.results.length > 0;
                    }
                }
                if (!restPath || !restPath.length || !restIndex) {
                    break;
                }
                /** @type {?} */
                var restPaths = this.__findIndex(indexerResults, restPath, restIndex, restParent);
                paths = paths.concat(restPaths);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return paths;
    };
    SimplePropertyIndexer.MARKER = '$____value';
    return SimplePropertyIndexer;
}());
export { SimplePropertyIndexer };
if (false) {
    /** @type {?} */
    SimplePropertyIndexer.MARKER;
    /** @type {?} */
    SimplePropertyIndexer.prototype.index;
    /** @type {?} */
    SimplePropertyIndexer.prototype.findOnlyWithValue;
}
/**
 * @record
 */
export function IndexerResult() { }
if (false) {
    /**
     * The path originally searched for
     * @type {?}
     */
    IndexerResult.prototype.target;
    /**
     * Flag for the status of found or not found.<br/>
     * Usually <code>results</code> will be empty if no matches found.
     * @type {?}
     */
    IndexerResult.prototype.found;
    /**
     * The result path and values from the index search.<br/>
     * Usually <code>results</code> will be empty if no matches found.
     * @type {?}
     */
    IndexerResult.prototype.results;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHktYmluZGluZy1yZWdpc3RyeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS1iaW5kaW5nLXJlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0E7Ozs7SUFBQTtRQUVVLGFBQVEsR0FBd0MsRUFBRSxDQUFDO0lBVTdELENBQUM7Ozs7O0lBUkMscURBQW1COzs7O0lBQW5CLFVBQW9CLElBQTBCO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLGdCQUFnQixFQUFFLENBQUM7UUFDcEUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCwrREFBNkI7OztJQUE3QjtRQUNFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFDSCw4QkFBQztBQUFELENBQUMsQUFaRCxJQVlDOzs7Ozs7O0lBVkMsMkNBQTJEOzs7O0lBaUIzRCxhQUFVOzs7Ozs7O0FBTVo7Ozs7SUFBQTtRQUNFLGlCQUFZLEdBQTBCLElBQUkscUJBQXFCLEVBQUUsQ0FBQztRQUNsRSxzQkFBaUIsR0FBMEIsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO0lBOEJ6RSxDQUFDOzs7Ozs7SUE1QkMsOEJBQUc7Ozs7O0lBQUgsVUFBSSxjQUFzQixFQUFFLGtCQUEwQjtRQUNwRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Ozs7O0lBRUQsK0NBQW9COzs7O0lBQXBCLFVBQXFCLGNBQXNC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Q0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO3FCQUMxRDtpQkFDRjtnQkFFRCxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDL0MsTUFBTTtpQkFDUDs7b0JBQ0ssU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDO2dCQUVuRixLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNqQzs7Ozs7Ozs7O1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBeEZNLDRCQUFNLEdBQUcsWUFBWSxDQUFDO0lBMEYvQiw0QkFBQztDQUFBLEFBNUZELElBNEZDO1NBNUZZLHFCQUFxQjs7O0lBRWhDLDZCQUE2Qjs7SUFDN0Isc0NBQW1COztJQUNuQixrREFBeUI7Ozs7O0FBMEYzQixtQ0F5QkM7Ozs7OztJQXJCQywrQkFBaUI7Ozs7OztJQUtqQiw4QkFBZTs7Ozs7O0lBS2YsZ0NBVUkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEdlbmVyYWwgcHVycG9zZSBwcm9wZXJ5IGJpbmRpbmcgcmVnaXN0cnlcbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5IHtcblxuICBwcml2YXRlIGJpbmRpbmdzOiB7IFtrZXk6IHN0cmluZ106IFByb3BlcnR5QmluZGluZ3MgfSA9IHt9O1xuXG4gIGdldFByb3BlcnR5QmluZGluZ3ModHlwZTogUHJvcGVydHlCaW5kaW5nVHlwZXMpOiBQcm9wZXJ0eUJpbmRpbmdzIHtcbiAgICB0aGlzLmJpbmRpbmdzW3R5cGVdID0gdGhpcy5iaW5kaW5nc1t0eXBlXSB8fCBuZXcgUHJvcGVydHlCaW5kaW5ncygpO1xuICAgIHJldHVybiB0aGlzLmJpbmRpbmdzW3R5cGVdO1xuICB9XG5cbiAgZ2V0UHJvcGVydHlCaW5kaW5nc1Zpc2liaWxpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlCaW5kaW5ncyhQcm9wZXJ0eUJpbmRpbmdUeXBlcy52aXNpYmlsaXR5KTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmluZXMgdGhlIHR5cGVzIG9mIHN1cHBvcnRlZCBwcm9wZXJ0eSBiaW5kaW5ncy48YnIvPlxuICogRm9yIG5vdyBvbmx5IDxjb2RlPnZpc2liaWxpdHk8L2NvZGU+IGlzIHN1cHBvcnRlZC48YnIvPlxuICovXG5leHBvcnQgZW51bSBQcm9wZXJ0eUJpbmRpbmdUeXBlcyB7XG4gIHZpc2liaWxpdHlcbn1cblxuLyoqXG4gKiBTdG9yYWdlIHRoYXQgaG9sZHMgYWxsIGJpbmRpbmdzIHRoYXQgYXJlIHByb3BlcnR5IHBhdGhzIHJlbGF0ZWQuPGJyLz5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5QmluZGluZ3Mge1xuICBzb3VyY2VzSW5kZXg6IFNpbXBsZVByb3BlcnR5SW5kZXhlciA9IG5ldyBTaW1wbGVQcm9wZXJ0eUluZGV4ZXIoKTtcbiAgZGVwZW5kZW5jaWVzSW5kZXg6IFNpbXBsZVByb3BlcnR5SW5kZXhlciA9IG5ldyBTaW1wbGVQcm9wZXJ0eUluZGV4ZXIoKTtcblxuICBhZGQoZGVwZW5kZW5jeVBhdGg6IHN0cmluZywgc291cmNlUHJvcGVydHlQYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNvdXJjZXNJbmRleC5zdG9yZShzb3VyY2VQcm9wZXJ0eVBhdGgsIGRlcGVuZGVuY3lQYXRoKTtcbiAgICB0aGlzLmRlcGVuZGVuY2llc0luZGV4LnN0b3JlKGRlcGVuZGVuY3lQYXRoLCBzb3VyY2VQcm9wZXJ0eVBhdGgpO1xuICB9XG5cbiAgZmluZEJ5RGVwZW5kZW5jeVBhdGgoZGVwZW5kZW5jeVBhdGg6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRlcGVuZGVuY2llc0luZGV4LmZpbmQoZGVwZW5kZW5jeVBhdGgpO1xuICAgIHJlc3VsdC5yZXN1bHRzID0gcmVzdWx0LnJlc3VsdHMgfHwgW107XG4gICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgcmVzIG9mIHJlc3VsdC5yZXN1bHRzKSB7XG4gICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KE9iamVjdC5rZXlzKHJlcy52YWx1ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LmZvdW5kID8gdmFsdWVzIDogW107XG4gIH1cblxuICBnZXRCeVNvdXJjZVByb3BlcnR5UGF0aChzb3VyY2VQcm9wZXJ0eVBhdGg6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnNvdXJjZXNJbmRleC5maW5kKHNvdXJjZVByb3BlcnR5UGF0aCk7XG4gICAgcmVzdWx0LnJlc3VsdHMgPSByZXN1bHQucmVzdWx0cyB8fCBbXTtcbiAgICBsZXQgdmFsdWVzID0gW107XG4gICAgZm9yIChjb25zdCByZXMgb2YgcmVzdWx0LnJlc3VsdHMpIHtcbiAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoT2JqZWN0LmtleXMocmVzLnZhbHVlKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQuZm91bmQgPyB2YWx1ZXMgOiBbXTtcbiAgfVxuXG4gIGNyZWF0ZVBhdGhJbmRleChwYXRoOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHBhdGguc3BsaXQoJy8nKTtcbiAgfVxufVxuXG4vKipcbiAqIFNpbXBsZSBpbmRleGVyIHRvIHN0b3JlIHByb3BlcnR5IHBhdGhzXG4gKi9cbmV4cG9ydCBjbGFzcyBTaW1wbGVQcm9wZXJ0eUluZGV4ZXIge1xuXG4gIHN0YXRpYyBNQVJLRVIgPSAnJF9fX192YWx1ZSc7XG4gIGluZGV4OiBvYmplY3QgPSB7fTtcbiAgZmluZE9ubHlXaXRoVmFsdWUgPSB0cnVlO1xuXG4gIHByaXZhdGUgX2NyZWF0ZVBhdGhJbmRleChwYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gcGF0aFxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnLy8nLCAnZycpLCAnLycpXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKCdeLycsICdnJyksICcnKVxuICAgICAgLnNwbGl0KCcvJykuZmlsdGVyKGl0ZW0gPT4gaXRlbSk7XG4gIH1cblxuICBzdG9yZShwcm9wZXJ0eVBhdGg6IHN0cmluZywgdmFsdWU/OiBhbnkpIHtcbiAgICB0aGlzLl9zdG9yZUluZGV4KHRoaXMuX2NyZWF0ZVBhdGhJbmRleChwcm9wZXJ0eVBhdGgpLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zdG9yZUluZGV4KHBhdGhJbmRleDogc3RyaW5nW10sIHZhbHVlPzogc3RyaW5nKSB7XG4gICAgbGV0IGluZGV4UG9zID0gdGhpcy5pbmRleDtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBwYXRoSW5kZXgpIHtcbiAgICAgIGluZGV4UG9zW2tleV0gPSBpbmRleFBvc1trZXldIHx8IHt9O1xuICAgICAgaW5kZXhQb3MgPSBpbmRleFBvc1trZXldO1xuICAgIH1cbiAgICBpZiAoaW5kZXhQb3MgJiYgdmFsdWUpIHtcbiAgICAgIGluZGV4UG9zW1NpbXBsZVByb3BlcnR5SW5kZXhlci5NQVJLRVJdID0gaW5kZXhQb3NbU2ltcGxlUHJvcGVydHlJbmRleGVyLk1BUktFUl0gfHwge307XG4gICAgICBpbmRleFBvc1tTaW1wbGVQcm9wZXJ0eUluZGV4ZXIuTUFSS0VSXVt2YWx1ZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmluZCBwYXRoIGluIGluZGV4Ljxici8+XG4gICAqIFdpbGwgZmluZCBwYXRoIGxpa2U6PGJyLz5cbiAgICogPHVsPlxuICAgKiAgICAgPGxpPi9wcm9wZXJ0eS8wL3Byb3A8L2xpPlxuICAgKiAgICAgPGxpPi9wcm9wZXJ0eS8wL3Byb3AvMi90ZXN0PC9saT5cbiAgICogICAgIDxsaT4vcHJvcGVydHkvMC9wcm9wLyYjNDI7L3Rlc3Q8L2xpPlxuICAgKiAgICAgPGxpPi9wcm9wZXJ0eS8mIzQyOy9wcm9wLzEvdGVzdDwvbGk+XG4gICAqICAgICA8bGk+L3Byb3BlcnR5LyYjNDI7L3Byb3AvJiM0MjsvdGVzdDwvbGk+XG4gICAqICAgICA8bGk+L3Byb3BlcnR5LzEvcHJvcC8mIzQyOy90ZXN0PC9saT5cbiAgICogIDwvdWw+XG4gICAqIEBwYXJhbSBwYXRoXG4gICAqL1xuICBmaW5kKHBhdGg6IHN0cmluZyk6IEluZGV4ZXJSZXN1bHQge1xuICAgIHJldHVybiB0aGlzLl9maW5kSW5JbmRleCh0aGlzLl9jcmVhdGVQYXRoSW5kZXgocGF0aCkpO1xuICB9XG5cbiAgX2ZpbmRJbkluZGV4KHBhdGg6IHN0cmluZ1tdKTogSW5kZXhlclJlc3VsdCB7XG4gICAgY29uc3QgaXhSZXM6IEluZGV4ZXJSZXN1bHQgPSB7dGFyZ2V0OiBwYXRoLCBmb3VuZDogZmFsc2UsIHJlc3VsdHM6IFtdfTtcbiAgICB0aGlzLl9fZmluZEluZGV4KGl4UmVzLCBwYXRoLCB0aGlzLmluZGV4LCBbXSk7XG4gICAgcmV0dXJuIGl4UmVzO1xuICB9XG5cbiAgX19maW5kSW5kZXgoaW5kZXhlclJlc3VsdHM6IEluZGV4ZXJSZXN1bHQsIHBhdGg6IHN0cmluZ1tdLCBpbmRleDogb2JqZWN0LCBwYXJlbnQ/OiBzdHJpbmdbXSkge1xuXG4gICAgY29uc3QgcCA9IHBhcmVudCB8fCBbXTtcbiAgICBjb25zdCBzZWdtZW50ID0gcGF0aFswXTtcbiAgICBjb25zdCB3aWxkID0gKCcqJyA9PT0gc2VnbWVudCkgPyBPYmplY3Qua2V5cyhpbmRleCkgOiBbXTtcbiAgICBjb25zdCBfa2V5cyA9ICgoQXJyYXkuaXNBcnJheShzZWdtZW50KSA/IHNlZ21lbnQgOiBbc2VnbWVudF0pIGFzIHN0cmluZ1tdKS5jb25jYXQod2lsZCk7XG4gICAgY29uc3Qga2V5cyA9IF9rZXlzLmZpbHRlcigoaXRlbSwgcG9zKSA9PiAnKicgIT09IGl0ZW0gJiYgX2tleXMuaW5kZXhPZihpdGVtKSA9PT0gcG9zKTsgLy8gcmVtb3ZlIGR1cGxpY2F0ZXNcblxuICAgIGlmIChpbmRleFsnKiddKSB7XG4gICAgICBrZXlzLnB1c2goJyonKTtcbiAgICB9XG5cbiAgICBsZXQgcGF0aHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCByZXN0UGF0aCA9IHBhdGguc2xpY2UoMSk7XG4gICAgICBjb25zdCByZXN0SW5kZXggPSBpbmRleFtrZXldO1xuICAgICAgY29uc3QgcmVzdFBhcmVudCA9IHAuY29uY2F0KGtleSk7XG5cbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkgey8vIGNvbGxlY3Qgb25seSB0aGUgZnVsbCBwYXRoc1xuICAgICAgICBpZiAoIXRoaXMuZmluZE9ubHlXaXRoVmFsdWUgfHwgKHJlc3RJbmRleCAmJiByZXN0SW5kZXhbU2ltcGxlUHJvcGVydHlJbmRleGVyLk1BUktFUl0pKSB7XG4gICAgICAgICAgaW5kZXhlclJlc3VsdHMucmVzdWx0cyA9IGluZGV4ZXJSZXN1bHRzLnJlc3VsdHMgfHwgW107XG4gICAgICAgICAgaW5kZXhlclJlc3VsdHMucmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICAgIHBhdGg6IHJlc3RQYXJlbnQsXG4gICAgICAgICAgICB2YWx1ZTogcmVzdEluZGV4W1NpbXBsZVByb3BlcnR5SW5kZXhlci5NQVJLRVJdXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcGF0aHMucHVzaChyZXN0UGFyZW50KTtcbiAgICAgICAgICBpbmRleGVyUmVzdWx0cy5mb3VuZCA9IGluZGV4ZXJSZXN1bHRzLnJlc3VsdHMubGVuZ3RoID4gMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXJlc3RQYXRoIHx8ICFyZXN0UGF0aC5sZW5ndGggfHwgIXJlc3RJbmRleCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3RQYXRocyA9IHRoaXMuX19maW5kSW5kZXgoaW5kZXhlclJlc3VsdHMsIHJlc3RQYXRoLCByZXN0SW5kZXgsIHJlc3RQYXJlbnQpO1xuXG4gICAgICBwYXRocyA9IHBhdGhzLmNvbmNhdChyZXN0UGF0aHMpO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aHM7XG4gIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGV4ZXJSZXN1bHQge1xuICAvKipcbiAgICogVGhlIHBhdGggb3JpZ2luYWxseSBzZWFyY2hlZCBmb3JcbiAgICovXG4gIHRhcmdldDogc3RyaW5nW107XG4gIC8qKlxuICAgKiBGbGFnIGZvciB0aGUgc3RhdHVzIG9mIGZvdW5kIG9yIG5vdCBmb3VuZC48YnIvPlxuICAgKiBVc3VhbGx5IDxjb2RlPnJlc3VsdHM8L2NvZGU+IHdpbGwgYmUgZW1wdHkgaWYgbm8gbWF0Y2hlcyBmb3VuZC5cbiAgICovXG4gIGZvdW5kOiBib29sZWFuO1xuICAvKipcbiAgICogVGhlIHJlc3VsdCBwYXRoIGFuZCB2YWx1ZXMgZnJvbSB0aGUgaW5kZXggc2VhcmNoLjxici8+XG4gICAqIFVzdWFsbHkgPGNvZGU+cmVzdWx0czwvY29kZT4gd2lsbCBiZSBlbXB0eSBpZiBubyBtYXRjaGVzIGZvdW5kLlxuICAgKi9cbiAgcmVzdWx0czoge1xuICAgIC8qKlxuICAgICAqIFRoZSBwYXRoIHRoYXQgbWF0Y2hlZCB0aGUgPGNvZGU+dGFyZ2V0PC9jb2RlPlxuICAgICAqIHNlcGFyYXRlZCBpbiBzZWdtZW50c1xuICAgICAqL1xuICAgIHBhdGg6IHN0cmluZ1tdLFxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBzdG9yZWQgYXQgdGhlIDxjb2RlPnBhdGg8L2NvZGU+XG4gICAgICovXG4gICAgdmFsdWU6IGFueVxuICB9W107XG59XG4iXX0=