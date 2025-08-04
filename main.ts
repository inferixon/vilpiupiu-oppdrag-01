namespace SpriteKind {
    export const MineHoming = SpriteKind.create()
    export const Weapon = SpriteKind.create()
    export const ContWeapon = SpriteKind.create()
    export const Explosion = SpriteKind.create()
    export const ContShield = SpriteKind.create()
    export const Asteroid = SpriteKind.create()
    export const Shield = SpriteKind.create()
    export const Splash = SpriteKind.create()
}
namespace StatusBarKind {
    export const Shield = StatusBarKind.create()
}
function spawnStarship () {
    starship = sprites.create(assets.image`starship`, SpriteKind.Player)
    // Simplified to single player - always center the jet
    starship.setPosition(scene.screenWidth() / 2, scene.screenHeight() * 0.8)
    starship.setStayInScreen(true)
    controller.player1.moveSprite(starship, 100, 30)
    shieldbar.value = 100
}
function doStartGame () {
    scene.setBackgroundImage(assets.image`splash-3`)
    sprites.destroyAllSpritesOfKind(SpriteKind.Splash)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    info.setScore(0)
    shieldbar = statusbars.create(25, 2, StatusBarKind.Shield)
    shieldbar.setColor(8, 2)
    shieldbar.positionDirection(CollisionDirection.Top)
    shieldbar.setOffsetPadding(-65, 0)
    gamescreen = 2
    spawnStarship()
}
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.ContWeapon, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
})
// Simplified: removed player selection buttons - any button starts game
function showSplash () {
    scene.setBackgroundImage(assets.image`splash1bg`)
    sprites.destroyAllSpritesOfKind(SpriteKind.Splash)
    splash1title = sprites.create(assets.image`splash_title`, SpriteKind.Splash)
    splash1title.setScale(0.9, ScaleAnchor.Middle)
    splash1title.setPosition(80, 50)
}
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.ContShield, function (sprite27, otherSprite25) {
    sprites.destroy(sprite27)
    doExplosion(otherSprite25)
})
// Removed jetShot2() function - simplified to single player
function spawnMineHoming () {
    mineHoming = sprites.create(assets.image`bomb`, SpriteKind.MineHoming)
    mineHoming.setPosition(randint(0, scene.screenWidth()), 2)
    mineHoming.setVelocity(randint(-4, 4), randint(12, 20))
    mineHoming.z += -5
    animation.runImageAnimation(
    mineHoming,
    assets.animation`mine-homing`,
    333,
    true
    )
    // Simplified to single player - always target jet1
    mineHoming.setFlag(SpriteFlag.AutoDestroy, true)
    mineHoming.follow(starship, 24)
}
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.Asteroid, function (sprite13, otherSprite12) {
    sprites.destroy(sprite13)
    doExplosion(otherSprite12)
    info.changeScoreBy(1)
})
// Removed Weapon2 collision handlers - simplified to single player
function doExplosion (expsprite: Sprite) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 1534, 255, 0, 150, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    explosion = sprites.create(assets.image`explosion-place`, SpriteKind.Explosion)
    explosion.setPosition(expsprite.x, expsprite.y)
    explosion.setVelocity(expsprite.vx, expsprite.vy)
    explosion.z = 1
    explosion.setFlag(SpriteFlag.AutoDestroy, true)
    animation.runImageAnimation(
    explosion,
    assets.animation`explosion`,
    100,
    false
    )
    pause(150)
    sprites.destroy(expsprite)
}
// Removed Weapon2 collision handlers - simplified to single player
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gamescreen == 2) {
        Shot(weaponType)
    } else if (gamescreen == 1) {
        doStartGame()
    }
})
statusbars.onZero(StatusBarKind.Shield, function (status2) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    controller.moveSprite(starship, 0, 0)
    doExplosion(starship)
    pause(1000)
    game.gameOver(false)
})
function spawnAsteroid (num3: number) {
    asteroid = sprites.create(assets.image`ast-1`, SpriteKind.Asteroid)
    if (num3 == 1) {
        animation.runImageAnimation(
        asteroid,
        assets.animation`aster-1`,
        444,
        true
        )
    }
    if (num3 == 2) {
        animation.runImageAnimation(
        asteroid,
        assets.animation`aster-2`,
        333,
        true
        )
    }
    if (num3 == 3) {
        animation.runImageAnimation(
        asteroid,
        assets.animation`aster-3`,
        399,
        true
        )
    }
    asteroid.setPosition(randint(0, scene.screenWidth()), 0)
    asteroid.setVelocity(randint(-3, 3), randint(8, 12))
    asteroid.z += -5
    asteroid.setFlag(SpriteFlag.AutoDestroy, true)
}
// Removed Weapon2 collision handlers - simplified to single player
function Shot (num2: number) {
    if (num2 == 1) {
        laser = sprites.create(assets.image`lasershot-2x`, SpriteKind.Weapon)
        laser.setPosition(starship.x - 0, starship.y - 8)
        laser.setVelocity(0, -150)
        laser.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Triangle, 1288, 137, 255, 0, 320, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (num2 == 2) {
        plasma = sprites.create(assets.image`plasmashot-3x`, SpriteKind.Weapon)
        plasma.setPosition(starship.x - 0, starship.y - 12)
        plasma.setVelocity(0, -200)
        plasma.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1199, 499, 255, 0, 557, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Asteroid, function (sprite23, otherSprite21) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 147, 99, 0, 404, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    // Simplified to single player - only handle jet1
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    controller.moveSprite(starship, 4, 2)
    shieldbar.value += randint(-10, -5)
    shielded = sprites.create(assets.image`infershield`, SpriteKind.Shield)
    shielded.setPosition(sprite23.x, sprite23.y)
    shielded.z += -4
    controller.moveSprite(shielded, 4, 2)
    doExplosion(otherSprite21)
    scene.cameraShake(10, 200)
    pause(200)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    controller.moveSprite(starship, 80, 30)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.MineHoming, function (sprite25, otherSprite23) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 147, 99, 0, 404, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    // Simplified to single player - only handle jet1    controller.player1.moveSprite(jet1, 4, 2)
    shieldbar.value += randint(-20, -15)
    shielded = sprites.create(assets.image`infershield`, SpriteKind.Shield)
    shielded.setPosition(sprite25.x, sprite25.y)
    shielded.z += -4
    controller.moveSprite(shielded, 4, 2)
    doExplosion(otherSprite23)
    scene.cameraShake(10, 200)
    pause(200)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    controller.moveSprite(starship, 80, 30)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ContWeapon, function (sprite17, otherSprite16) {
    sprites.destroy(otherSprite16)
    music.play(music.createSoundEffect(WaveShape.Triangle, 333, 2643, 255, 0, 496, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    // Simplified to single player - only handle jet1
    if (weaponType < 2) {
        weaponType = 2
    }
})
// Removed Weapon2 collision handlers - simplified to single player
sprites.onOverlap(SpriteKind.Player, SpriteKind.ContShield, function (sprite8, otherSprite7) {
    sprites.destroy(otherSprite7)
    // Simplified to single player - only handle jet1
    shieldbar.value += randint(5, 20)
    music.play(music.createSoundEffect(WaveShape.Sine, 1132, 2381, 146, 0, 444, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
})
// Removed doShowTips() function - simplified game flow
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.MineHoming, function (sprite7, otherSprite6) {
    sprites.destroy(sprite7)
    doExplosion(otherSprite6)
    info.changeScoreBy(3)
})
let contWeapon: Sprite = null
let stjerne: Sprite = null
let contShield: Sprite = null
let shielded: Sprite = null
let plasma: Sprite = null
let laser: Sprite = null
let asteroid: Sprite = null
let explosion: Sprite = null
let mineHoming: Sprite = null
let splash1title: Sprite = null
let shieldbar: StatusBarSprite = null
let starship: Sprite = null
let weaponType = 0
let gamescreen = 0
gamescreen = 1
weaponType = 1
showSplash()
game.onUpdateInterval(30000, function () {
    if (gamescreen == 2) {
        if (info.score() > 30) {
            contShield = sprites.create(assets.image`shield-cont`, SpriteKind.ContShield)
            contShield.setPosition(randint(0, scene.screenWidth()), 0)
            contShield.setVelocity(randint(-1, 1), 15)
            contShield.z += -5
            contShield.setFlag(SpriteFlag.AutoDestroy, true)
        }
    }
})
game.onUpdateInterval(500, function () {
    if (gamescreen == 2) {
        if (Math.percentChance(34)) {
            spawnAsteroid(randint(1, 3))
        }
        if (Math.percentChance(10) && weaponType >= 2) {
            spawnMineHoming()
        }
    }
})
game.onUpdateInterval(100, function () {
    if (gamescreen == 2) {
        if (Math.percentChance(34)) {
            stjerne = sprites.createProjectileFromSide(assets.image`stjerne`, 0, randint(20, 30))
            stjerne.setPosition(randint(0, scene.screenWidth()), 0)
            stjerne.z += -6
            stjerne.setFlag(SpriteFlag.AutoDestroy, true)
        }
    }
})
game.onUpdateInterval(20000, function () {
    if (gamescreen == 2) {
        if (info.score() > 20 && weaponType == 1) {
            contWeapon = sprites.create(assets.image`wp-cont`, SpriteKind.ContWeapon)
            contWeapon.setPosition(randint(0, scene.screenWidth()), 0)
            contWeapon.setVelocity(randint(-1, 1), 15)
            contWeapon.z += -5
            contWeapon.setFlag(SpriteFlag.AutoDestroy, true)
        }
    }
})
