/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: felix@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

define(function(require, exports, module) {
    var OptionsManager = require('famous/core/OptionsManager');
    var Transform = require('famous/core/Transform');
    var ViewSequence = require('famous/core/ViewSequence');
    var Utility = require('famous/utilities/Utility');
    var Entity = require('famous/core/Entity');

    /**
     * ContextualSequentialLayout will lay out a collection of renderables sequentially in the specified direction.
     * @class ContextualSequentialLayout
     * @constructor
     * @param {Options} [options] An object of configurable options.
     * @param {Number} [options.direction=Utility.Direction.Y] Using the direction helper found in the famous Utility
     * module, this option will lay out the ContextualSequentialLayout instance's renderables either horizontally
     * (x) or vertically (y). Utility's direction is essentially either zero (X) or one (Y), so feel free
     * to just use integers as well.
     * @param {Array.Number} [options.defaultItemSize=[50, 50]] In the case where a renderable layed out
     * under ContextualSequentialLayout's control doesen't have a getSize method, ContextualSequentialLayout will assign it
     * this default size. (Commonly a case with Views).
     */
    function ContextualSequentialLayout(options) {
        this._items = null;
        this._size = null;
        this._outputFunction = ContextualSequentialLayout.DEFAULT_OUTPUT_FUNCTION;

        this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
        this.optionsManager = new OptionsManager(this.options);

        this._id = Entity.register(this);

        this._itemsCache = [];
        this._outputCache = {
            size: null,
            target: this._itemsCache
        };

        if (options) this.setOptions(options);
    }

    ContextualSequentialLayout.DEFAULT_OPTIONS = {
        direction: Utility.Direction.Y,
        itemSpacing: 0,
        defaultItemSize: [50, 50]
    };

    ContextualSequentialLayout.DEFAULT_OUTPUT_FUNCTION = function DEFAULT_OUTPUT_FUNCTION(input, offset, index) {
        var transform = (this.options.direction === Utility.Direction.X) ? Transform.translate(offset, 0) : Transform.translate(0, offset);
        return {
            transform: transform,
            target: input.render()
        };
    };

    /**
     * Returns the width and the height of the ContextualSequentialLayout instance.
     *
     * @method getSize
     * @return {Array} A two value array of the ContextualSequentialLayout instance's current width and height (in that order).
     */
    ContextualSequentialLayout.prototype.getSize = function getSize() {
        if (!this._size) this.render(); // hack size in
        return this._size;
    };

    /**
     * Sets the collection of renderables under the ContextualSequentialLayout instance's control.
     *
     * @method sequenceFrom
     * @param {Array|ViewSequence} items Either an array of renderables or a Famous viewSequence.
     * @chainable
     */
    ContextualSequentialLayout.prototype.sequenceFrom = function sequenceFrom(items) {
        if (items instanceof Array) items = new ViewSequence(items);
        this._items = items;
        return this;
    };

    /**
     * Patches the ContextualSequentialLayout instance's options with the passed-in ones.
     *
     * @method setOptions
     * @param {Options} options An object of configurable options for the ContextualSequentialLayout instance.
     * @chainable
     */
    ContextualSequentialLayout.prototype.setOptions = function setOptions(options) {
        this.optionsManager.setOptions.apply(this.optionsManager, arguments);
        return this;
    };

    /**
     * setOutputFunction is used to apply a user-defined output transform on each processed renderable.
     *  For a good example, check out ContextualSequentialLayout's own DEFAULT_OUTPUT_FUNCTION in the code.
     *
     * @method setOutputFunction
     * @param {Function} outputFunction An output processer for each renderable in the ContextualSequentialLayout
     * instance.
     * @chainable
     */
    ContextualSequentialLayout.prototype.setOutputFunction = function setOutputFunction(outputFunction) {
        this._outputFunction = outputFunction;
        return this;
    };

    ContextualSequentialLayout.prototype.getSave = function() {
        return this.save
    }

    /**
     * Generate a render spec from the contents of this component.
     *
     * @private
     * @method render
     * @return {number} Render spec for this component
     */
    ContextualSequentialLayout.prototype.render = function render() {
        return this._id;
    };

    ContextualSequentialLayout.prototype.commit = function commit(parentContext) {
        var parentSize      = parentContext.size;
        var parentOpacity   = parentContext.opacity;
        var parentOrigin    = parentContext.origin;
        var parentAlign     = parentContext.align;
        var parentTransform = parentContext.transform;

        var direction = this.options.direction;
        var offset = 0;
        
        var result = [];

        var currentNode = this._items;
        var i = 0;

        while (currentNode) {
            var item = currentNode.get();
            if(!item) break;

            // console.log(i)
            var itemSize;
            if (item.getSize) {
                itemSize = item.getSize();
                // console.log('if: ', itemSize)
                if (!itemSize) itemSize = [0, 0]
            }
            else{
                itemSize = this.options.defaultItemSize;
                // console.log('else: ', itemSize)
            }

            if (itemSize[0] === undefined) itemSize[0] = parentSize[0];
            if (itemSize[1] === undefined) itemSize[1] = parentSize[1];

            var output = this._outputFunction.call(this, item, offset, i);
            result[i] = output;

            offset += itemSize[direction];
            currentNode = currentNode.getNext();
            i++;
        }

        this.save = {
            size: parentSize,
            transform: parentTransform,
            opacity: parentOpacity,
            target: result
        }

        return {
            size: parentSize,
            transform: parentTransform,
            opacity: parentOpacity,
            target: result
        };
    };

    module.exports = ContextualSequentialLayout;
});
