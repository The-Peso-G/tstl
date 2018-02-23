/// <reference path="../../API.ts" />

/// <reference path="Iterator.ts" />
/// <reference path="ReverseIterator.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class ArrayIterator<T, Source extends IArrayContainer<T>>
		extends Iterator<T>
		implements IArrayIterator<T>
	{
		/**
		 * @hidden
		 */
		private source_: Source;

		/**
		 * @hidden
		 */
		private index_: number;
		
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(source: Source, index: number)
		{
			super();

			this.source_ = source;
			this.index_ = index;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public source(): Source
		{
			return this.source_ as Source;
		};
		public index(): number
		{
			return this.index_;
		}

		public get value(): T
		{
			return this.source().at(this.index_)
		}
		public set value(val: T)
		{
			this.source().set(this.index_, val);
		};

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		public prev(): ArrayIterator<T, Source>
		{
			return new ArrayIterator<T, Source>(this.source(), this.index_ - 1);
		}
		public next(): ArrayIterator<T, Source>
		{
			return new ArrayIterator<T, Source>(this.source(), this.index_ + 1);
		}

		public advance(n: number): ArrayIterator<T, Source>
		{
			return new ArrayIterator<T, Source>(this.source(), this.index_ + n);
		}

		/* ---------------------------------------------------------
			COMPARES
		--------------------------------------------------------- */
		public equals(obj: ArrayIterator<T, Source>): boolean
		{
			return equal_to(this.source_, obj.source_) && this.index_ == obj.index_;
		}
	}
}

namespace std.base
{
	/**
	 * @hidden
	 */
	export class ArrayReverseIterator<T, Source extends IArrayContainer<T>>
		extends ReverseIterator<T, Source, ArrayIterator<T, Source>, ArrayReverseIterator<T, Source>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(base: ArrayIterator<T, Source>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: ArrayIterator<T, Source>): ArrayReverseIterator<T, Source>
		{
			return new ArrayReverseIterator<T, Source>(base);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public index(): number
		{
			return this.base_.index();
		}

		public get value(): T
		{
			return this.base_.value;
		}

		public set value(val: T)
		{
			this.base_.value = val;
		}
	}
}
