import * as std from "../../index";

export function test_modifiers(): void
{
    _Test_removes();
    _Test_replaces();

    _Test_uniques();
    _Test_rotate();
}

function _Test_removes(): void
{
    let v: std.Vector<number> = _Create_sample();
    v.erase(std.remove(v.begin(), v.end(), 2), v.end());

    let it = std.find(v.begin(), v.end(), 2);
    if (it.equals(v.end()) === false)
        throw new std.DomainError("Error on std.remove().");
}
function _Test_replaces(): void
{
    let v: std.Vector<number> = _Create_sample();
    std.replace(v.begin(), v.end(), 2, 4);

    let it = std.find(v.begin(), v.end(), 2);
    if (it.equals(v.end()) === false)
        throw new std.DomainError("Error on std.replace().");
}

function _Test_uniques(): void
{
    let l: std.List<number> = new std.List();
    for (let i: number = 0; i < 1000; ++i)
        l.push_back(Math.floor(Math.random() * 50));

    l.sort();
    let v = new std.Vector<number>(l.begin(), l.end());

    l.unique();
    v.erase(std.unique(v.begin(), v.end()), v.end());

    if (std.equal(v.begin(), v.end(), l.begin()) === false)
        throw new std.DomainError("Error on std.unique().");
}
function _Test_rotate(): void
{
    let x: std.Vector<number> = new std.Vector([0, 1, 2, 3, 4, 5]);
    let y: std.Vector<number> = new std.Vector([3, 4, 5, 0, 1, 2]);

    std.rotate(x.begin(), x.begin().advance(3), x.end());

    if (std.equal(x.begin(), x.end(), y.begin()) === false)
        throw new std.DomainError("Error on std.rotate().");
}

function _Create_sample(): std.Vector<number>
{
    return new std.Vector<number>([1, 2, 2, 3, 3, 3]);
}