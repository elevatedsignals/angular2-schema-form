import { __decorate, __values } from "tslib";
import { Injectable } from "@angular/core";
/**
 * General purpose propery binding registry
 */
var PropertyBindingRegistry = /** @class */ (function () {
    function PropertyBindingRegistry() {
        this.bindings = {};
    }
    PropertyBindingRegistry.prototype.getPropertyBindings = function (type) {
        this.bindings[type] = this.bindings[type] || new PropertyBindings();
        return this.bindings[type];
    };
    PropertyBindingRegistry.prototype.getPropertyBindingsVisibility = function () {
        return this.getPropertyBindings(PropertyBindingTypes.visibility);
    };
    PropertyBindingRegistry = __decorate([
        Injectable()
    ], PropertyBindingRegistry);
    return PropertyBindingRegistry;
}());
export { PropertyBindingRegistry };
/**
 * Defines the types of supported property bindings.<br/>
 * For now only <code>visibility</code> is supported.<br/>
 */
export var PropertyBindingTypes;
(function (PropertyBindingTypes) {
    PropertyBindingTypes[PropertyBindingTypes["visibility"] = 0] = "visibility";
})(PropertyBindingTypes || (PropertyBindingTypes = {}));
/**
 * Storage that holds all bindings that are property paths related.<br/>
 */
var PropertyBindings = /** @class */ (function () {
    function PropertyBindings() {
        this.sourcesIndex = new SimplePropertyIndexer();
        this.dependenciesIndex = new SimplePropertyIndexer();
    }
    PropertyBindings.prototype.add = function (dependencyPath, sourcePropertyPath) {
        this.sourcesIndex.store(sourcePropertyPath, dependencyPath);
        this.dependenciesIndex.store(dependencyPath, sourcePropertyPath);
    };
    PropertyBindings.prototype.findByDependencyPath = function (dependencyPath) {
        var e_1, _a;
        var result = this.dependenciesIndex.find(dependencyPath);
        result.results = result.results || [];
        var values = [];
        try {
            for (var _b = __values(result.results), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    PropertyBindings.prototype.getBySourcePropertyPath = function (sourcePropertyPath) {
        var e_2, _a;
        var result = this.sourcesIndex.find(sourcePropertyPath);
        result.results = result.results || [];
        var values = [];
        try {
            for (var _b = __values(result.results), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    PropertyBindings.prototype.createPathIndex = function (path) {
        return path.split('/');
    };
    return PropertyBindings;
}());
export { PropertyBindings };
/**
 * Simple indexer to store property paths
 */
var SimplePropertyIndexer = /** @class */ (function () {
    function SimplePropertyIndexer() {
        this.index = {};
        this.findOnlyWithValue = true;
    }
    SimplePropertyIndexer.prototype._createPathIndex = function (path) {
        return path
            .replace(new RegExp('//', 'g'), '/')
            .replace(new RegExp('^/', 'g'), '')
            .split('/').filter(function (item) { return item; });
    };
    SimplePropertyIndexer.prototype.store = function (propertyPath, value) {
        this._storeIndex(this._createPathIndex(propertyPath), value);
    };
    SimplePropertyIndexer.prototype._storeIndex = function (pathIndex, value) {
        var e_3, _a;
        var indexPos = this.index;
        try {
            for (var pathIndex_1 = __values(pathIndex), pathIndex_1_1 = pathIndex_1.next(); !pathIndex_1_1.done; pathIndex_1_1 = pathIndex_1.next()) {
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
    SimplePropertyIndexer.prototype.find = function (path) {
        return this._findInIndex(this._createPathIndex(path));
    };
    SimplePropertyIndexer.prototype._findInIndex = function (path) {
        var ixRes = { target: path, found: false, results: [] };
        this.__findIndex(ixRes, path, this.index, []);
        return ixRes;
    };
    SimplePropertyIndexer.prototype.__findIndex = function (indexerResults, path, index, parent) {
        var e_4, _a;
        var p = parent || [];
        var segment = path[0];
        var wild = ('*' === segment) ? Object.keys(index) : [];
        var _keys = (Array.isArray(segment) ? segment : [segment]).concat(wild);
        var keys = _keys.filter(function (item, pos) { return '*' !== item && _keys.indexOf(item) === pos; }); // remove duplicates
        if (index['*']) {
            keys.push('*');
        }
        var paths = [];
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                var restPath = path.slice(1);
                var restIndex = index[key];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHktYmluZGluZy1yZWdpc3RyeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY2hlbWEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS1iaW5kaW5nLXJlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDOztHQUVHO0FBRUg7SUFBQTtRQUVVLGFBQVEsR0FBd0MsRUFBRSxDQUFDO0lBVTdELENBQUM7SUFSQyxxREFBbUIsR0FBbkIsVUFBb0IsSUFBMEI7UUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUNwRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELCtEQUE2QixHQUE3QjtRQUNFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFYVSx1QkFBdUI7UUFEbkMsVUFBVSxFQUFFO09BQ0EsdUJBQXVCLENBWW5DO0lBQUQsOEJBQUM7Q0FBQSxBQVpELElBWUM7U0FaWSx1QkFBdUI7QUFjcEM7OztHQUdHO0FBQ0gsTUFBTSxDQUFOLElBQVksb0JBRVg7QUFGRCxXQUFZLG9CQUFvQjtJQUM5QiwyRUFBVSxDQUFBO0FBQ1osQ0FBQyxFQUZXLG9CQUFvQixLQUFwQixvQkFBb0IsUUFFL0I7QUFFRDs7R0FFRztBQUNIO0lBQUE7UUFDRSxpQkFBWSxHQUEwQixJQUFJLHFCQUFxQixFQUFFLENBQUM7UUFDbEUsc0JBQWlCLEdBQTBCLElBQUkscUJBQXFCLEVBQUUsQ0FBQztJQThCekUsQ0FBQztJQTVCQyw4QkFBRyxHQUFILFVBQUksY0FBc0IsRUFBRSxrQkFBMEI7UUFDcEQsSUFBSSxDQUFDLFlB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T0FBTyxDQUFDLElBQUksQ0FBQzs0QkFDMUIsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLEtBQUssRUFBRSxTQUFTLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDO3lCQUMvQyxDQUFDLENBQUM7d0JBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDdkIsY0FBYyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7cUJBQzFEO2lCQUNGO2dCQUVELElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUMvQyxNQUFNO2lCQUNQO2dCQUNELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBRXBGLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2pDOzs7Ozs7Ozs7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUF4Rk0sNEJBQU0sR0FBRyxZQUFZLENBQUM7SUEwRi9CLDRCQUFDO0NBQUEsQUE1RkQsSUE0RkM7U0E1RlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG4vKipcbiAqIEdlbmVyYWwgcHVycG9zZSBwcm9wZXJ5IGJpbmRpbmcgcmVnaXN0cnlcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFByb3BlcnR5QmluZGluZ1JlZ2lzdHJ5IHtcblxuICBwcml2YXRlIGJpbmRpbmdzOiB7IFtrZXk6IHN0cmluZ106IFByb3BlcnR5QmluZGluZ3MgfSA9IHt9O1xuXG4gIGdldFByb3BlcnR5QmluZGluZ3ModHlwZTogUHJvcGVydHlCaW5kaW5nVHlwZXMpOiBQcm9wZXJ0eUJpbmRpbmdzIHtcbiAgICB0aGlzLmJpbmRpbmdzW3R5cGVdID0gdGhpcy5iaW5kaW5nc1t0eXBlXSB8fCBuZXcgUHJvcGVydHlCaW5kaW5ncygpO1xuICAgIHJldHVybiB0aGlzLmJpbmRpbmdzW3R5cGVdO1xuICB9XG5cbiAgZ2V0UHJvcGVydHlCaW5kaW5nc1Zpc2liaWxpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlCaW5kaW5ncyhQcm9wZXJ0eUJpbmRpbmdUeXBlcy52aXNpYmlsaXR5KTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmluZXMgdGhlIHR5cGVzIG9mIHN1cHBvcnRlZCBwcm9wZXJ0eSBiaW5kaW5ncy48YnIvPlxuICogRm9yIG5vdyBvbmx5IDxjb2RlPnZpc2liaWxpdHk8L2NvZGU+IGlzIHN1cHBvcnRlZC48YnIvPlxuICovXG5leHBvcnQgZW51bSBQcm9wZXJ0eUJpbmRpbmdUeXBlcyB7XG4gIHZpc2liaWxpdHlcbn1cblxuLyoqXG4gKiBTdG9yYWdlIHRoYXQgaG9sZHMgYWxsIGJpbmRpbmdzIHRoYXQgYXJlIHByb3BlcnR5IHBhdGhzIHJlbGF0ZWQuPGJyLz5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5QmluZGluZ3Mge1xuICBzb3VyY2VzSW5kZXg6IFNpbXBsZVByb3BlcnR5SW5kZXhlciA9IG5ldyBTaW1wbGVQcm9wZXJ0eUluZGV4ZXIoKTtcbiAgZGVwZW5kZW5jaWVzSW5kZXg6IFNpbXBsZVByb3BlcnR5SW5kZXhlciA9IG5ldyBTaW1wbGVQcm9wZXJ0eUluZGV4ZXIoKTtcblxuICBhZGQoZGVwZW5kZW5jeVBhdGg6IHN0cmluZywgc291cmNlUHJvcGVydHlQYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNvdXJjZXNJbmRleC5zdG9yZShzb3VyY2VQcm9wZXJ0eVBhdGgsIGRlcGVuZGVuY3lQYXRoKTtcbiAgICB0aGlzLmRlcGVuZGVuY2llc0luZGV4LnN0b3JlKGRlcGVuZGVuY3lQYXRoLCBzb3VyY2VQcm9wZXJ0eVBhdGgpO1xuICB9XG5cbiAgZmluZEJ5RGVwZW5kZW5jeVBhdGgoZGVwZW5kZW5jeVBhdGg6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRlcGVuZGVuY2llc0luZGV4LmZpbmQoZGVwZW5kZW5jeVBhdGgpO1xuICAgIHJlc3VsdC5yZXN1bHRzID0gcmVzdWx0LnJlc3VsdHMgfHwgW107XG4gICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgcmVzIG9mIHJlc3VsdC5yZXN1bHRzKSB7XG4gICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KE9iamVjdC5rZXlzKHJlcy52YWx1ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LmZvdW5kID8gdmFsdWVzIDogW107XG4gIH1cblxuICBnZXRCeVNvdXJjZVByb3BlcnR5UGF0aChzb3VyY2VQcm9wZXJ0eVBhdGg6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnNvdXJjZXNJbmRleC5maW5kKHNvdXJjZVByb3BlcnR5UGF0aCk7XG4gICAgcmVzdWx0LnJlc3VsdHMgPSByZXN1bHQucmVzdWx0cyB8fCBbXTtcbiAgICBsZXQgdmFsdWVzID0gW107XG4gICAgZm9yIChjb25zdCByZXMgb2YgcmVzdWx0LnJlc3VsdHMpIHtcbiAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoT2JqZWN0LmtleXMocmVzLnZhbHVlKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQuZm91bmQgPyB2YWx1ZXMgOiBbXTtcbiAgfVxuXG4gIGNyZWF0ZVBhdGhJbmRleChwYXRoOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHBhdGguc3BsaXQoJy8nKTtcbiAgfVxufVxuXG4vKipcbiAqIFNpbXBsZSBpbmRleGVyIHRvIHN0b3JlIHByb3BlcnR5IHBhdGhzXG4gKi9cbmV4cG9ydCBjbGFzcyBTaW1wbGVQcm9wZXJ0eUluZGV4ZXIge1xuXG4gIHN0YXRpYyBNQVJLRVIgPSAnJF9fX192YWx1ZSc7XG4gIGluZGV4OiBvYmplY3QgPSB7fTtcbiAgZmluZE9ubHlXaXRoVmFsdWUgPSB0cnVlO1xuXG4gIHByaXZhdGUgX2NyZWF0ZVBhdGhJbmRleChwYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gcGF0aFxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnLy8nLCAnZycpLCAnLycpXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKCdeLycsICdnJyksICcnKVxuICAgICAgLnNwbGl0KCcvJykuZmlsdGVyKGl0ZW0gPT4gaXRlbSk7XG4gIH1cblxuICBzdG9yZShwcm9wZXJ0eVBhdGg6IHN0cmluZywgdmFsdWU/OiBhbnkpIHtcbiAgICB0aGlzLl9zdG9yZUluZGV4KHRoaXMuX2NyZWF0ZVBhdGhJbmRleChwcm9wZXJ0eVBhdGgpLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zdG9yZUluZGV4KHBhdGhJbmRleDogc3RyaW5nW10sIHZhbHVlPzogc3RyaW5nKSB7XG4gICAgbGV0IGluZGV4UG9zID0gdGhpcy5pbmRleDtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBwYXRoSW5kZXgpIHtcbiAgICAgIGluZGV4UG9zW2tleV0gPSBpbmRleFBvc1trZXldIHx8IHt9O1xuICAgICAgaW5kZXhQb3MgPSBpbmRleFBvc1trZXldO1xuICAgIH1cbiAgICBpZiAoaW5kZXhQb3MgJiYgdmFsdWUpIHtcbiAgICAgIGluZGV4UG9zW1NpbXBsZVByb3BlcnR5SW5kZXhlci5NQVJLRVJdID0gaW5kZXhQb3NbU2ltcGxlUHJvcGVydHlJbmRleGVyLk1BUktFUl0gfHwge307XG4gICAgICBpbmRleFBvc1tTaW1wbGVQcm9wZXJ0eUluZGV4ZXIuTUFSS0VSXVt2YWx1ZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmluZCBwYXRoIGluIGluZGV4Ljxici8+XG4gICAqIFdpbGwgZmluZCBwYXRoIGxpa2U6PGJyLz5cbiAgICogPHVsPlxuICAgKiAgICAgPGxpPi9wcm9wZXJ0eS8wL3Byb3A8L2xpPlxuICAgKiAgICAgPGxpPi9wcm9wZXJ0eS8wL3Byb3AvMi90ZXN0PC9saT5cbiAgICogICAgIDxsaT4vcHJvcGVydHkvMC9wcm9wLyYjNDI7L3Rlc3Q8L2xpPlxuICAgKiAgICAgPGxpPi9wcm9wZXJ0eS8mIzQyOy9wcm9wLzEvdGVzdDwvbGk+XG4gICAqICAgICA8bGk+L3Byb3BlcnR5LyYjNDI7L3Byb3AvJiM0MjsvdGVzdDwvbGk+XG4gICAqICAgICA8bGk+L3Byb3BlcnR5LzEvcHJvcC8mIzQyOy90ZXN0PC9saT5cbiAgICogIDwvdWw+XG4gICAqIEBwYXJhbSBwYXRoXG4gICAqL1xuICBmaW5kKHBhdGg6IHN0cmluZyk6IEluZGV4ZXJSZXN1bHQge1xuICAgIHJldHVybiB0aGlzLl9maW5kSW5JbmRleCh0aGlzLl9jcmVhdGVQYXRoSW5kZXgocGF0aCkpO1xuICB9XG5cbiAgX2ZpbmRJbkluZGV4KHBhdGg6IHN0cmluZ1tdKTogSW5kZXhlclJlc3VsdCB7XG4gICAgY29uc3QgaXhSZXM6IEluZGV4ZXJSZXN1bHQgPSB7dGFyZ2V0OiBwYXRoLCBmb3VuZDogZmFsc2UsIHJlc3VsdHM6IFtdfTtcbiAgICB0aGlzLl9fZmluZEluZGV4KGl4UmVzLCBwYXRoLCB0aGlzLmluZGV4LCBbXSk7XG4gICAgcmV0dXJuIGl4UmVzO1xuICB9XG5cbiAgX19maW5kSW5kZXgoaW5kZXhlclJlc3VsdHM6IEluZGV4ZXJSZXN1bHQsIHBhdGg6IHN0cmluZ1tdLCBpbmRleDogb2JqZWN0LCBwYXJlbnQ/OiBzdHJpbmdbXSkge1xuXG4gICAgY29uc3QgcCA9IHBhcmVudCB8fCBbXTtcbiAgICBjb25zdCBzZWdtZW50ID0gcGF0aFswXTtcbiAgICBjb25zdCB3aWxkID0gKCcqJyA9PT0gc2VnbWVudCkgPyBPYmplY3Qua2V5cyhpbmRleCkgOiBbXTtcbiAgICBjb25zdCBfa2V5cyA9ICgoQXJyYXkuaXNBcnJheShzZWdtZW50KSA/IHNlZ21lbnQgOiBbc2VnbWVudF0pIGFzIHN0cmluZ1tdKS5jb25jYXQod2lsZCk7XG4gICAgY29uc3Qga2V5cyA9IF9rZXlzLmZpbHRlcigoaXRlbSwgcG9zKSA9PiAnKicgIT09IGl0ZW0gJiYgX2tleXMuaW5kZXhPZihpdGVtKSA9PT0gcG9zKTsgLy8gcmVtb3ZlIGR1cGxpY2F0ZXNcblxuICAgIGlmIChpbmRleFsnKiddKSB7XG4gICAgICBrZXlzLnB1c2goJyonKTtcbiAgICB9XG5cbiAgICBsZXQgcGF0aHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCByZXN0UGF0aCA9IHBhdGguc2xpY2UoMSk7XG4gICAgICBjb25zdCByZXN0SW5kZXggPSBpbmRleFtrZXldO1xuICAgICAgY29uc3QgcmVzdFBhcmVudCA9IHAuY29uY2F0KGtleSk7XG5cbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkgey8vIGNvbGxlY3Qgb25seSB0aGUgZnVsbCBwYXRoc1xuICAgICAgICBpZiAoIXRoaXMuZmluZE9ubHlXaXRoVmFsdWUgfHwgKHJlc3RJbmRleCAmJiByZXN0SW5kZXhbU2ltcGxlUHJvcGVydHlJbmRleGVyLk1BUktFUl0pKSB7XG4gICAgICAgICAgaW5kZXhlclJlc3VsdHMucmVzdWx0cyA9IGluZGV4ZXJSZXN1bHRzLnJlc3VsdHMgfHwgW107XG4gICAgICAgICAgaW5kZXhlclJlc3VsdHMucmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICAgIHBhdGg6IHJlc3RQYXJlbnQsXG4gICAgICAgICAgICB2YWx1ZTogcmVzdEluZGV4W1NpbXBsZVByb3BlcnR5SW5kZXhlci5NQVJLRVJdXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcGF0aHMucHVzaChyZXN0UGFyZW50KTtcbiAgICAgICAgICBpbmRleGVyUmVzdWx0cy5mb3VuZCA9IGluZGV4ZXJSZXN1bHRzLnJlc3VsdHMubGVuZ3RoID4gMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXJlc3RQYXRoIHx8ICFyZXN0UGF0aC5sZW5ndGggfHwgIXJlc3RJbmRleCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3RQYXRocyA9IHRoaXMuX19maW5kSW5kZXgoaW5kZXhlclJlc3VsdHMsIHJlc3RQYXRoLCByZXN0SW5kZXgsIHJlc3RQYXJlbnQpO1xuXG4gICAgICBwYXRocyA9IHBhdGhzLmNvbmNhdChyZXN0UGF0aHMpO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aHM7XG4gIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGV4ZXJSZXN1bHQge1xuICAvKipcbiAgICogVGhlIHBhdGggb3JpZ2luYWxseSBzZWFyY2hlZCBmb3JcbiAgICovXG4gIHRhcmdldDogc3RyaW5nW107XG4gIC8qKlxuICAgKiBGbGFnIGZvciB0aGUgc3RhdHVzIG9mIGZvdW5kIG9yIG5vdCBmb3VuZC48YnIvPlxuICAgKiBVc3VhbGx5IDxjb2RlPnJlc3VsdHM8L2NvZGU+IHdpbGwgYmUgZW1wdHkgaWYgbm8gbWF0Y2hlcyBmb3VuZC5cbiAgICovXG4gIGZvdW5kOiBib29sZWFuO1xuICAvKipcbiAgICogVGhlIHJlc3VsdCBwYXRoIGFuZCB2YWx1ZXMgZnJvbSB0aGUgaW5kZXggc2VhcmNoLjxici8+XG4gICAqIFVzdWFsbHkgPGNvZGU+cmVzdWx0czwvY29kZT4gd2lsbCBiZSBlbXB0eSBpZiBubyBtYXRjaGVzIGZvdW5kLlxuICAgKi9cbiAgcmVzdWx0czoge1xuICAgIC8qKlxuICAgICAqIFRoZSBwYXRoIHRoYXQgbWF0Y2hlZCB0aGUgPGNvZGU+dGFyZ2V0PC9jb2RlPlxuICAgICAqIHNlcGFyYXRlZCBpbiBzZWdtZW50c1xuICAgICAqL1xuICAgIHBhdGg6IHN0cmluZ1tdLFxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBzdG9yZWQgYXQgdGhlIDxjb2RlPnBhdGg8L2NvZGU+XG4gICAgICovXG4gICAgdmFsdWU6IGFueVxuICB9W107XG59XG4iXX0=