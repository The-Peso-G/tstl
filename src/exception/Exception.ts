//================================================================ 
/** @module std */
//================================================================
/**
 * Base Exception.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class Exception extends Error
{
    /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
    /**
     * Default Constructor.
     */
    public constructor();

    /**
     * Initializer Constructor.
     * 
     * @param message The error messgae.
     */
    public constructor(message: string);

    public constructor(message: string = "")
    {
        super(message);

        // INHERITANCE POLYFILL
        let proto = new.target.prototype;
        if (Object.setPrototypeOf)
            Object.setPrototypeOf(this, proto);
        else
            (this as any).__proto__ = proto;
    }

    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * The error name.
     */
    public get name(): string
    {
        return this.constructor.name;
    }

    /**
     * Get error message.
     * 
     * @return The error message.
     */
    public what(): string
    {
        return this.message;
    }

    /**
     * Native function for `JSON.stringify()`.
     * 
     * The {@link Exception.toJSON} function returns only three properties; ({@link name}, {@link message} and {@link stack}). If you want to define a new sub-class extending the {@link Exception} and let the class to export additional props (or remove some props), override this {@link Exception.toJSON} method.
     * 
     * @return An object for `JSON.stringify()`.
     */
    public toJSON(): object
    {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack
        };
    }
}

export type exception = Exception;
export const exception = Exception;